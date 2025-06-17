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
  status: {
    type: String,
    enum: ["pending", "assigned", "done", "cancelled"],
    default: "pending",
  },
  selectedOptionType: { type: String },
  selectedPrice: { type: Number },
  rating: { type: Number, min: 1, max: 5 },
  review: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
