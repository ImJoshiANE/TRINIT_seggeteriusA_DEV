const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  subscription: { type: Schema.Types.ObjectId, ref: "Subscription" },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  paymentStatus: { type: String, enum: ["Completed", "Pending", "Failed"] },
  paymentMethod: String,
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
