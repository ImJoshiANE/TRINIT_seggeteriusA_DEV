const { catchAsync } = require('../utils/util');
const AppError = require('../utils/appError');

const Subscription = require('../models/subscriptionModel');
const SubscriptionPlan = require('../models/subscriptionPlanModel');

// Fetching all plans of a particular tutor
const getAllSubscriptionPlans = catchAsync(async (req, res, next) => {
  const subscriptionPlans = await SubscriptionPlan.find({ tutor: req.user.id });

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
    duration,
    minSessionsPerMonth,
    availableFrom,
    availableUntil,
    timeSlot,
  } = req.body;

  const subscriptions = await Subscription.find({ tutor: req.user.id });

  const bookedTill = subscriptions.reduce((maxDate, subscription) => {
    const till =
      subscription.startDate + subscription.subscriptionPlan.duration;
    return till > maxDate ? subscription.availableUntil : maxDate;
  }, new Date(0));

  if (bookedTill > availableFrom) {
    return next(
      new AppError(
        'Subscription Plan Overlaps with existing subscription, please select a later date',
        400
      )
    );
  }

  // Create Subscription Plan
  const subscriptionPlan = await SubscriptionPlan.create({
    tutor: req.user.id,
    title,
    description,
    duration,
    minSessionsPerMonth,
    availableFrom,
    availableUntil,
    timeSlot,
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
