const mongoose = require("mongoose");

const tollLogSchema = new mongoose.Schema(
  {
    licensePlate: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    vehicleType: {
      type: String,
      enum: ["Car", "Truck", "Motorcycle"],
      required: true,
    },
    isOfficial: {
      type: Boolean,
      default: false,
    },
    tollFee: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Paid", "Pending", "Violation"],
      default: "Pending",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

tollLogSchema.index({ timestamp: -1 });

module.exports = mongoose.model("TollLog", tollLogSchema);
