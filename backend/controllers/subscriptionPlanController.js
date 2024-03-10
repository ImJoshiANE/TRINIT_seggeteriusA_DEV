const { catchAsync } = require('../utils/util');
const AppError = require('../utils/appError');

const Subscription = require('../models/subscriptionModel');
const SubscriptionPlan = require('../models/subscriptionPlanModel');

// Fetching all plans of a particular tutor
const getAllSubscriptionPlans = catchAsync(async (req, res, next) => {
  const subscriptionPlans = await SubscriptionPlan.find({
    tutor: req.tutor._id,
  });

  res.status(200).json({
    status: 'success',
    data: subscriptionPlans,
  });
});

const getSubscriptionPlan = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: 'Subscription Plan',
  });
});

const createSubscriptionPlan = catchAsync(async (req, res, next) => {
  const {
    title,
    description,
    validity,
    regOpenFrom,
    regOpenTill,
    sessionStartAt,
    sessionDuration,
    level,
    language,
    daysOfWeek,
  } = req.body;

  // Restict tutor to create plan on conflicting days, time and conflicting days
  // 1) if creating in the same time slot & conflicting days & conflicting start

  // Create Subscription Plan
  const subscriptionPlan = await SubscriptionPlan.create({
    tutor: req.tutor._id,
    title,
    description,
    validity,
    regOpenFrom,
    regOpenTill,
    sessionStartAt,
    sessionDuration,
    level,
    language,
    daysOfWeek,
  });

  if (!subscriptionPlan)
    return next(new AppError('Error Creating Subscription Plan', 500));

  res.status(200).json({
    status: 'success',
    message: 'Subscription Plan Created',
    data: subscriptionPlan,
  });
});

const updateSubscriptionPlan = catchAsync(async (req, res, next) => {
  const subscriptionPlan = await Subscription.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!subscriptionPlan)
    return next(new AppError('Error Updating Subscription Plan', 500));

  res.status(200).json({
    status: 'success',
    message: 'Subscription Plan Updated',
    data: subscriptionPlan,
  });
});

module.exports = {
  getAllSubscriptionPlans,
  getSubscriptionPlan,
  createSubscriptionPlan,
  updateSubscriptionPlan,
};
