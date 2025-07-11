const Booking = require("../models/booking");
const Employee = require("../models/employee");

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().select("-password");
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employees" });
  }
};

const getAssignedBookings = async (req, res) => {
  try {
    const staffId = req.user.id;
    const bookings = await Booking.find({ assignedStaff: staffId })
      .populate("user", "name phone")
      .populate("service", "name")
      .sort({ date: 1 });

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get assigned bookings" });
  }
};

const updateBookingStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);
    booking.status = "done";
    // if (!booking || booking.assignedStaff.toString() !== req.user.id) {
    //   return res.status(403).json({ message: "Not authorized" });
    // }

    // booking.status = status;
    await booking.save();

    res.json({ message: "Booking status updated", booking });
  } catch (err) {
    res.status(500).json({ message: "Failed to update booking" });
  }
};

const addStaffNote = async (req, res) => {
  const { id } = req.params;
  const { note } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking || booking.assignedStaff.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.noteFromStaff = note;
    await booking.save();

    res.json({ message: "Note added", note });
  } catch (err) {
    res.status(500).json({ message: "Failed to add note" });
  }
};

const getBookingsByDate = async (req, res) => {
  const { date } = req.query;
  const staffId = req.user.id;

  try {
    let query = { assignedStaff: staffId };

    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);

      query.date = {
        $gte: start.toISOString().split("T")[0],
        $lt: end.toISOString().split("T")[0],
      };
    }

    const bookings = await Booking.find(query)
      .populate("user", "name")
      .populate("service", "name")
      .sort({ time: 1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to get bookings by date" });
  }
};

module.exports = {
  getAssignedBookings,
  updateBookingStatus,
  addStaffNote,
  getBookingsByDate,
  getAllEmployees,
};
