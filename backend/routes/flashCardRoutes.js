const express = require('express');
const router = express.Router();

const flashCardController = require('../controllers/flashCardController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router
  .route('/')
  .get(flashCardController.getAllFlashCards)
  .post(flashCardController.createFlashCard);

router
  .route('/:id')
  .patch(flashCardController.updateFlashCard)
  .delete(flashCardController.deleteFlashCard);

module.exports = router;
