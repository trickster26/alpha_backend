const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth.middleware');
const dashboardController = require('../controllers/dashboard.controller');

// All dashboard routes should be protected
router.use(authMiddleware);

// Get dashboard analytics data
router.get('/analytics', dashboardController.getAnalytics);

// Get recent campaigns
router.get('/campaigns', dashboardController.getCampaigns);

// Get recent activity
router.get('/activity', dashboardController.getRecentActivity);

module.exports = router; 