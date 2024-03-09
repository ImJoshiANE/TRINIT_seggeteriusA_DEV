const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Tutor = require('../models/tutorModel');
const { catchAsync } = require('../utils/util');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

exports.restrictTo = (...accTypes) => {
  return (req, res, next) => {
    const userType = req.user?.accountType || req.tutor?.user.accountType;
    console.log(userType, 'userRole');
    if (!accTypes.includes(userType)) {
      return next(
        new AppError('You are not allowed to perform this action', 403)
      );
    }
    next();
  };
};

// A MIDDLEWARE TO RESTRIC USER ACCESS TO CERTAIN FUNCTIONN,
exports.isloggedIn = catchAsync(async (req, res, next) => {
  // 1. GET THE TOKEN IF IT EXIST
  let token;

  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next();
  }

  // 2. VALIDATE TOKEN
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // 3. CHECK IF USER STILL EXIST
  const user = await User.findOne({ _id: decoded.id });

  let tutor;

  if (!user) {
    tutor = await Tutor.findOne({ _id: decoded.id }).populate('user');

    if (!tutor)
      return next(
        new AppError(`User doesn't exists now, please log in again`, 401)
      );
  }

  // 4. CHECK IF USER CHANGED PASSWORD AFTER JWT SIGN
  // NOT NEEDED NOW

  const data = user || tutor;

  res.status(200).json({
    status: 'success',
    data
});

// A MIDDLEWARE TO RESTRICT USER ACCESS TO CERTAIN FUNCTIONN,
exports.protect = catchAsync(async (req, res, next) => {
  // 1. GET THE TOKEN IF IT EXIST
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = String(req.headers.authorization).split[' '][1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError('User is not logged in', 401));
  }

  // 2. VALIDATE TOKEN
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // 3. CHECK IF USER STILL EXIST
  let currUser = await User.findOne({ _id: decoded.id });

  let currTutor;

  if (!currUser) {
    currTutor = await Tutor.findOne({ _id: decoded.id }).populate('user');

    if (!currTutor)
      return next(
        new AppError(`User doesn't exists now, please log in again`, 401)
      );
  }

  // 4. CHECK IF USER CHANGED PASSWORD AFTER JWT SIGN
  // NOT NEEDED, FOR NOW, AS CHANGED PASSWORD IS NOT IMPLEMENTED

  if (currUser) {
    req.user = currUser;
  }

  if (currTutor) {
    req.tutor = currTutor;
  }
  next();
});

const verifyUser = catchAsync(async (req, res, next) => {
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

  return user;
});

// JWT RECOMMENDS THE SECRET LENGTH TO BE OF ATLEAST 32 CHARACTER
const sendJwtToken = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),

    // secure: true,
    httpOnly: true,
  });

  // user can be tutor
  // if (!user.emailConfirmed || tutor.user.emailConfirmed === false) {
  //   return res.status(200).json({
  //     status: "error",
  //     issue: "emailNotConfirmed",
  //     message: "A email confirmation has sent to your email. Please confirm it",
  //   });
  // }
  return res.status(200).json({
    status: 'success',
    user,
    token,
  });
};

const sendConfirmationEmail = catchAsync(async (user, req) => {
  const confirmationToken = await user.createToken('emailConfirmation');
  await user.save({ validateBeforeSave: false });
  const confirmationURL = `${req.protocol}://${req.hostname}/confirmEmail/${confirmationToken}`;

  await new Email(user, confirmationURL).sendAccountConfirmation();
});

exports.confirmEmail = catchAsync(async (req, res, next) => {
  const hashedToken = await crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({ emailConfirmationToken: hashedToken });

  if (!user) {
    return next(
      new AppError('This token is invalid! Please get a new token', 400)
    );
  }

  user.emailConfirmed = true;
  user.emailConfirmationToken = undefined;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Email confirmed successfully',
  });
});

exports.signup = catchAsync(async (req, res, next) => {
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
  });

  // SEND CONFIRMATION EMAIL
  // await sendConfirmationEmail(user, req);

  sendJwtToken(user, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const user = await verifyUser(req, res, next);

  // 3. SEND TOKEN TO CLIENT
  sendJwtToken(user, res);
});

// ROUTE WHEN USERS CLICKS ON LOGOUT IN NAV
exports.logout = (req, res, next) => {
  // MAKING THE JWT TO EXPIRE IN 1 MILLISEC
  res.cookie('jwt', undefined, {
    expires: new Date(Date.now() + 1),
  });
  res.status(200).json({
    status: 'success',
  });
};

exports.sendJwtToken = sendJwtToken;
