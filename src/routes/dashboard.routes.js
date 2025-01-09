const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const dashboardController = require('../controllers/dashboard.controller');

router.use(protect);

router.get('/analytics', dashboardController.getAnalytics);
router.get('/campaigns', dashboardController.getCampaigns);
router.get('/activity', dashboardController.getRecentActivity);

module.exports = router; 