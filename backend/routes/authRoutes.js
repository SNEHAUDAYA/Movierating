const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { getMe } = require('../controllers/authController');
router.get('/me', protect, getMe);

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;