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
    language,
  } = req.body;

  let { daysOfWeek } = req.body;

  if (!daysOfWeek) {
    daysOfWeek = [0, 1, 2, 3, 4, 5, 6];
  }

  const slotStartTime = timeSlot.startTime;

  const [hours, minutes] = slotStartTime.split(':');
  const slotStart = new Date();
  slotStart.setHours(parseInt(hours));
  slotStart.setMinutes(parseInt(minutes));

  if (availableFrom > Date.now() + 1000 * 60 * 60 * 24 * 7) {
    return next(new AppError('Available From should be within a week', 400));
  }
  const subscriptions = await Subscription.find({
    tutor: req.tutor._id,
  }).populate('subscriptionPlan');

  const subsWeekday = subscriptions.filter((sub) => {
    for (let i = 0; i < daysOfWeek.length; i++) {
      if (sub.subscriptionPlan.daysOfWeek?.includes(daysOfWeek[i])) {
        return true;
      }
    }
  });

  const slotEnd = slotStart.getTime() + timeSlot.duration * 60 * 1000;
  const slotSub = subsWeekday.filter((sub) => {
    const startTimeDb = new Date(sub.subscriptionPlan.timeSlot.startTime);

    const endTimeDb =
      startTimeDb.getTime() +
      sub.subscriptionPlan.timeSlot.duration * 60 * 1000;

    return (
      (startTimeDb >= slotStart && startTimeDb <= slotEnd) ||
      (endTimeDb >= slotStart && endTimeDb <= slotEnd)
    );
  });

  const bookedTill = slotSub.reduce((maxDate, sub) => {
    const till =
      new Date(sub.startDate).getTime() +
      sub.subscriptionPlan.duration * 24 * 60 * 60 * 1000 * 28;

    return till > maxDate ? till : maxDate;
  }, new Date());

  const availFrom = availableFrom ? availableFrom : new Date();

  if (bookedTill > availFrom) {
    return next(
      new AppError(
        'Subscription Plan Overlaps with existing subscription, Please check your dashboard, and choose time, days in week, date accordingly',
        400
      )
    );
  }

  // Create Subscription Plan
  const subscriptionPlan = await SubscriptionPlan.create({
    tutor: req.tutor._id,
    title,
    description,
    duration,
    minSessionsPerMonth,
    availableFrom,
    availableUntil,
    language,
    daysOfWeek,
    timeSlot: {
      startTime: slotStart,
      duration: timeSlot.duration,
    },
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
