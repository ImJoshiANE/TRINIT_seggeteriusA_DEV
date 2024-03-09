const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// DESIGNING USER SCHEMA
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    length: [6, 'Password must be at least 6 characters long'],
  },
  accountType: { type: String, enum: ['tutor', 'student'], default: 'student' },
  profilePicture: String,
  languages: [String],
  joinedOn: { type: Date, default: Date.now },

  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailConfirmationToken: String,
});

// ENCRYPTING THE PASSWORD
userSchema.pre('save', async function (next) {
  // IF THE PASSWORD IS NOT UPDATED WHILE UPDATING THE USER, WE DO NOT NEED TO ECRYPT IT
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// CREATING A INSTANCE METHOD ON USER SCHEMA TO VALIDATE PASSWORD
userSchema.methods.correctPassword = async (enteredPass, dbPass) =>
  await bcrypt.compare(enteredPass, dbPass);

userSchema.methods.createToken = async function (str) {
  // This function is creating a random 64 characters string
  const token = crypto.randomBytes(32).toString('hex');
  const hashedToken = await crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  if (str === 'passwordReset') {
    // This is used to hash the string
    this.passwordResetToken = hashedToken;
    this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
    // Means 1000 * 60 means,, 60 sec i,e 1 min and * 10 means 10 min
    // So the token will expire in 10 minutes
  } else if (str === 'emailConfirmation') {
    this.emailConfirmationToken = hashedToken;
  }
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
