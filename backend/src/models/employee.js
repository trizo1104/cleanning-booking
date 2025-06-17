const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  assignedBookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
});

module.exports = mongoose.model("Employee", employeeSchema);
