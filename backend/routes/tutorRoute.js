const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');
const tutorControler = require('../controllers/tutorController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/tutors', tutorController.getTutors);
router.get('/tutor/:id', tutorController.getTutor);

//Checking the user if he is logged in before giving access to apis of his profile
router.use(authController.protect);

// router.patch("/updateMe", userController.updateMe);
// router.delete("/deleteMe", userController.deleteMe);

module.exports = router;
