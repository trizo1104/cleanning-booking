const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    icon: { type: String, default: null },
    serviceOptions: [
      {
        optionType: {
          type: String,
          required: true,
        },
        priceFrom: { type: Number, required: true },
        description: { type: String },
      },
    ],
    duration: { type: Number },
    description: { type: String },
    details: { type: String },
    notes: { type: String },
    warrantyPolicy: {
      type: String,
      default: "7 days warranty after service completion",
    },
    benefits: [String],
    procedureSteps: [
      {
        step: { type: String, required: true },
        stepDescription: { type: String, required: true },
      },
    ],
    safetyStandards: [String],
    imageUrls: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
