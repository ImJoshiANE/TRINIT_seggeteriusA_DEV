const { catchAsync } = require('../utils/util');
const AppError = require('../utils/appError');

const Tutor = require('../models/tutorModel');
const SubscriptionPlan = require('../models/subscriptionPlanModel');
const User = require('../models/userModel');

const { sendJwtToken } = require('./authController');
const getTutors = catchAsync(async (req, res, next) => {});

const getTutor = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const tutor = await Tutor.findById(id).populate('user');

  if (!tutor) {
    return next(new AppError('No tutor found with that ID', 404));
  }

  const subscriptionPlans = await SubscriptionPlan.find({ tutor: id });

  const availablePlans = subscriptionPlans.filter((sub) => {
    return sub.isAvailable === true;
  });

  const data = {
    tutor,
    availablePlans,
  };

  res.status(200).json({
    status: 'success',
    data,
  });
});

const signup = catchAsync(async (req, res, next) => {
  // IF USER ALREADY EXIST, CREATE ERROR

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return next(new AppError('Email Already exist, please login.', 500));

  // ELSE CREATE USER
  user = await User.create({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    languages: req.body.languages,
    accountType: 'tutor',
  });

  // SEND CONFIRMATION EMAIL
  // await sendConfirmationEmail(user, req);

  const tutor = await Tutor.create({
    user: user._id,
    bio: req.body.bio,
    expertise: req.body.expertise,
    pricing: req.body.pricing,
  });

  // SEND JWT TOKEN
  sendJwtToken(tutor, res);
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1. CHECK IF EMAIL PASSWORD EXIST

  if (!email || !password) {
    return next(new AppError('Please enter email and password!', 404));
  }
  // 2. CHECK IF USER EXIST AND PASSWORD IS CORRECT
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid Email or Password!', 500));
  }

  const tutor = await Tutor.findOne({ user: user._id });

  // 3. SEND TOKEN TO CLIENT
  sendJwtToken(tutor, res);
});

module.exports = { getTutors, getTutor, signup, login };
