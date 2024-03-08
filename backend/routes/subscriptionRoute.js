const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

const subscriptionController = require('../controllers/subscriptionController');

router.use(authController.protect);

router.use(authController.restrictTo('student'));

router.get('/', subscriptionController.getAllSubscriptions);
router.get('/:id', subscriptionController.getSubscription);

router.post('/', subscriptionController.createSubscription);

module.exports = router;
