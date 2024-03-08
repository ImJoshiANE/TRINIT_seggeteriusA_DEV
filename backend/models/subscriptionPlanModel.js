const mongoose = require('mongoose');

const subscriptionPlanSchema = new mongoose.Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Tutor ID
  title: {
    type: String,
    required: true,
  },
  description: String,
  duration: { type: Number, enum: [1, 3, 6] }, // in months
  minSessionsPerMonth: {
    type: Number,
    required: true,
  },
  availableFrom: {
    type: Date,
    default: Date.now,
  }, // Date from which the plan becomes available
  availableUntil: Date, // Date until which the plan remains available
  timeSlot: {
    daysOfWeek: [{ type: Number, min: 0, max: 6 }], // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    startTime: String, // HH:MM format
    duration: { type: Number, enum: [30, 45, 60] }, // HH:MM format
  },

  language: {
    type: String,
    required: true,
  },

  isAvailable: { type: Boolean, default: true },
});

const SubscriptionPlan = mongoose.model(
  'SubscriptionPlan',
  subscriptionPlanSchema
);

module.exports = SubscriptionPlan;
