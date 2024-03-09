const { catchAsync } = require('../utils/util');
const AppError = require('../utils/appError');
const FlashCard = require('../models/flashCardModel');
const User = require('../models/userModel');

const getAllFlashCards = catchAsync(async (req, res, next) => {
  const flashCards = await FlashCard.find({ student: req.user._id });

  res.status(200).json({
    status: 'success',
    data: {
      flashCards,
    },
  });
});

const createFlashCard = catchAsync(async (req, res, next) => {
  const flashCard = await FlashCard.create({
    ...req.body,
    student: req.user._id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      flashCard,
    },
  });
});

const updateFlashCard = catchAsync(async (req, res, next) => {
  const flashCard = await FlashCard.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!flashCard) {
    return next(new AppError('No flashCard found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      flashCard,
    },
  });
});

const deleteFlashCard = catchAsync(async (req, res, next) => {
  const flashCard = await FlashCard.findByIdAndDelete(req.params.id);

  if (!flashCard) {
    return next(new AppError('No flashCard found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

module.exports = {
  getAllFlashCards,
  createFlashCard,
  updateFlashCard,
  deleteFlashCard,
};
