const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  bio: String,
  expertise: [
    {
      language: String,
      experienceInMonths: Number,
    },
  ],
  pricing: [
    {
      level: { type: String, enum: ["beginner", "intermediate", "advanced"] },
      pricePerHour: Number,
    },
  ],
  totalSubscriptionTaken: { type: Number, default: 0 },
});

const Tutor = mongoose.model("Tutor", tutorSchema);

module.exports = Tutor;
