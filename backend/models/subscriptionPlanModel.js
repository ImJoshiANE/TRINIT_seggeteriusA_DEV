const mongoose = require("mongoose");

const subscriptionPlanSchema = new mongoose.Schema({
  tutor: { type: Schema.Types.ObjectId, ref: "User" }, // Tutor ID
  name: {
    type: String,
    required: true,
  },
  description: String,
  duration: { type: Number, enum: [30, 45, 60] }, // in minutes
  maxSessionsPerMonth: {
    type: Number,
    required: true,
  },
  availableFrom: {
    type: Date,
    default: Date.now,
  }, // Date from which the plan becomes available
  availableUntil: Date, // Date until which the plan remains available
  timeSlots: [
    {
      dayOfWeek: { type: Number, min: 0, max: 6 }, // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      startTime: String, // HH:MM format
      endTime: String, // HH:MM format
    },
  ],
  status: { type: String, enum: ["Active", "Expired", "Canceled"] },
});

const SubscriptionPlan = mongoose.model(
  "SubscriptionPlan",
  subscriptionPlanSchema
);

module.exports = SubscriptionPlan;
