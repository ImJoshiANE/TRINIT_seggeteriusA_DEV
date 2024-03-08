const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  student: { type: Schema.Types.ObjectId, ref: "User" },
  tutor: { type: Schema.Types.ObjectId, ref: "User" },
  subscriptionPlan: { type: Schema.Types.ObjectId, ref: "SubscriptionPlan" },
  startDate: {
    type: Date,
    default: Date.now,
  },
  status: { type: String, enum: ["Active", "Expired", "Canceled"] },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
