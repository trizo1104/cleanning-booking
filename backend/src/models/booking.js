const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  address: { type: String, required: true },
  note: { type: String },
  noteFromStaff: { type: String },
  status: {
    type: String,
    enum: ["pending", "assigned", "done", "cancelled"],
    default: "pending",
  },
  selectedOptionType: { type: String },
  assignedStaff: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  selectedPrice: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
