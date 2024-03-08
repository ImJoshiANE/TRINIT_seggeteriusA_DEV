const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

const subscriptionPlanController = require('../controllers/subscriptionPlanController');

router.use(authController.protect);
router.use(authController.restrictTo('tutor'));

router.get('/', subscriptionPlanController.getAllSubscriptionPlans);

router.get('/:id', subscriptionPlanController.getSubscriptionPlan);

router.post('/', subscriptionPlanController.createSubscriptionPlan);

module.exports = router;
