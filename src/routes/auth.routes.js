const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/me', protect, authController.getCurrentUser);
router.get('/logout', protect, authController.logout);

module.exports = router; 