const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["staff", "admin"],
      default: "staff",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    assignedBookings: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Booking",
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
