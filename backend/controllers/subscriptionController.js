const { catchAsync } = require('../utils/util');
const AppError = require('../utils/appError');

const Subscription = require('../models/subscriptionModel');

const getAllSubscriptions = catchAsync(async (req, res, next) => {
  const subscriptions = await Subscription.find({
    student: req.user.id,
  }).populate('subscriptionPlan');

  res.status(200).json({
    status: 'success',
    data: subscriptions,
  });
});

const getSubscription = catchAsync(async (req, res, next) => {
  const subscription = await Subscription.findById(req.params.id).populate(
    'subscriptionPlan'
  );

  if (!subscription) {
    return next(new AppError('No Subscription found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: subscription,
  });
});

const createSubscription = catchAsync(async (req, res, next) => {
  const { subscriptionPlan, startDate, tutor } = req.body;

  const subscription = await Subscription.create({
    student: req.user.id,
    subscriptionPlan,
    startDate,
  });

  if (!subscription)
    return next(new AppError('Error Creating Subscription', 500));

  res.status(200).json({
    status: 'success',
    message: 'Subscription Created',
    data: subscription,
  });
});

module.exports = {
  getAllSubscriptions,
  getSubscription,
  createSubscription,
};
