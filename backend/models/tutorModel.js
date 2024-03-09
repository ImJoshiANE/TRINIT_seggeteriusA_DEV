const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bio: String,
  expertise: [
    {
      language: String,
      experience: Number, // in months
    },
  ],
  pricing: [
    {
      level: { type: String, enum: ['beginner', 'intermediate', 'advance'] },
      pricePerHour: Number,
    },
  ],

  totalStudents: { type: Number, default: 0 },
});

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;
