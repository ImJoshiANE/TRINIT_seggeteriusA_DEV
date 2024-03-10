const mongoose = require('mongoose');

const subscriptionPlanSchema = new mongoose.Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Tutor ID
  title: {
    type: String,
    required: true,
  },
  description: String,
  regOpenFrom: {
    type: Date,
    default: Date.now,
  }, // Date from which the plan becomes available
  regOpenTill: Date, // Date until which the plan remains available
  daysOfWeek: [
    { type: Number, min: 0, max: 6, default: [0, 1, 2, 3, 4, 5, 6] },
  ], // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // Variable pricing based on level and duration
  validity: [{ type: Number, enum: [1, 3, 6] }], // in months
  sessionStartAt: [
    {
      type: String,
      required: true,
    },
  ],
  sessionDuration: [
    {
      type: Number,
      required: true,
      enum: [30, 45, 60],
    },
  ],

  level: [
    {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advance'],
    },
  ],

  language: {
    type: String,
    required: true,
  },
});

const SubscriptionPlan = mongoose.model(
  'SubscriptionPlan',
  subscriptionPlanSchema
);

module.exports = SubscriptionPlan;
