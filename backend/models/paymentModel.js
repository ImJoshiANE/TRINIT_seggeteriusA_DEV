const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  paymentMethod: String,
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
