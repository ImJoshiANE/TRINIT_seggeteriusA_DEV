const mongoose = require('mongoose');

const flashCardSchema = new mongoose.Schema({
  language: {
    type: String,
    enum: ['English'],
    default: 'English',
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

const FlashCard = mongoose.model('FlashCard', flashCardSchema);

module.exports = FlashCard;
