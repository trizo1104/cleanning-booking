const Booking = require("../models/booking");

const createBooking = async (req, res) => {
  try {
    const {
      service,
      date,
      time,
      address,
      note,
      selectedOptionType,
      selectedPrice,
    } = req.body;

    const booking = await Booking.create({
      user: req.user._id,
      service,
      date,
      time,
      address,
      note,
      selectedOptionType,
      selectedPrice,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .sort({
        date: -1,
      })
      .populate("service", "name");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user bookings" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("employee", "name email")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all bookings" });
  }
};

const assignEmployee = async (req, res) => {
  const { employeeId } = req.body;

  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.employee = employeeId;
    booking.status = "assigned";
    await booking.save();

    res.json({ message: "Employee assigned successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Failed to assign employee" });
  }
};

const getTodayBookingsForEmployee = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const bookings = await Booking.find({
      employee: req.user._id,
      date: today,
    }).sort({ time: 1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch today's bookings" });
  }
};

const markBookingCompleted = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.employee.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this booking" });
    }

    booking.status = "done";
    booking.completedAt = new Date();
    await booking.save();

    res.json({ message: "Booking marked as completed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking status" });
  }
};

const reviewBooking = async (req, res) => {
  const { rating, review } = req.body;

  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: "Booking not exist" });

    if (String(booking.user) !== String(req.user._id))
      return res
        .status(403)
        .json({ message: "You do not have permission to rate this booking" });

    if (booking.status !== "done")
      return res
        .status(400)
        .json({ message: "Can only be rated after completion" });

    booking.rating = rating;
    booking.review = review;
    await booking.save();

    res.json({ message: "Successful", booking });
  } catch (error) {
    res.status(500).json({ message: "fails rating" });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  assignEmployee,
  getTodayBookingsForEmployee,
  markBookingCompleted,
  reviewBooking,
};
