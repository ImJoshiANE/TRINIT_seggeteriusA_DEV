const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  subscription: { type: Schema.Types.ObjectId, ref: "Subscription" },
  tutor: { type: Schema.Types.ObjectId, ref: "User" },
  student: { type: Schema.Types.ObjectId, ref: "User" },
  scheduledDate: { Date },
  status: {
    type: String,
    enum: ["Scheduled", "In Progress", "Completed", "Canceled"],
  },
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
