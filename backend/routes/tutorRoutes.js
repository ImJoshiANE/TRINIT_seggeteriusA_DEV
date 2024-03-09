const express = require('express');

const router = express.Router();

const tutorController = require('../controllers/tutorController');

router.post('/signup', tutorController.signup);
router.post('/login', tutorController.login);
// router.get('/logout', tutorController.logout);

router.get('/', tutorController.getAllTutors);
router.get('/:id', tutorController.getTutor);

// router.patch("/updateMe", userController.updateMe);
// router.delete("/deleteMe", userController.deleteMe);

module.exports = router;
