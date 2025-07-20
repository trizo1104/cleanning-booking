const Booking = require("../models/booking");
const Employee = require("../models/employee");
const Review = require("../models/reivew");

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
      .populate("service", "name")
      // .populate("employee", "name email")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch all bookings" });
  }
};

const getAllPendingBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ status: "pending" })
      .populate("user", "name email")
      .populate("service", "name")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch pending bookings" });
  }
};

const assignStaff = async (req, res) => {
  const { employeeId } = req.body;
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const employee = await Employee.findById(employeeId);
    if (!employee || employee.role !== "staff")
      return res.status(404).json({ message: "Staff not found" });

    booking.assignedStaff = employeeId;
    booking.status = "assigned";

    await booking.save();

    if (!employee.assignedBookings.includes(booking._id)) {
      employee.assignedBookings.push(booking._id);
      await employee.save();
    }

    res.json({ message: "Staff assigned successfully", booking });
  } catch (error) {
    console.error("assignStaff error", error);
    res.status(500).json({ message: "Failed to assign staff" });
  }
};

const cancelBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled", booking });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel booking" });
  }
};

const reviewBooking = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.status === "done" || booking.status === "paid") {
      const existingReview = await Review.findOne({ booking: booking._id });
      if (existingReview)
        return res
          .status(400)
          .json({ message: "This booking has already been reviewed" });

      const newReview = new Review({
        user: req.user._id,
        booking: booking._id,
        service: booking.service,
        rating,
        comment,
      });

      await newReview.save();

      res
        .status(201)
        .json({ message: "Review submitted successfully", review: newReview });
    } else {
      return res
        .status(400)
        .json({ message: "Only completed bookings can be reviewed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit review" });
  }
};

const getReviewsByService = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const reviews = await Review.find({ service: serviceId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get reviews" });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name")
      .populate("service", "name")
      .populate("booking", "selectedOptionType");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted success" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review" });
  }
};

const cancelAssignedBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.assignedStaff = null;
    booking.status = "pending";

    await booking.save();

    res.json({ message: "Assigned staff cancelled successfully", booking });
  } catch (error) {
    console.error("cancelAssignedBooking error", error);
    res.status(500).json({ message: "Failed to cancel assigned booking" });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  reviewBooking,
  getReviewsByService,
  assignStaff,
  cancelBooking,
  getAllReviews,
  deleteReview,
  getAllPendingBookings,
  cancelAssignedBooking,
};
