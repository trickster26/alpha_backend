const Campaign = require('../models/campaign.model');
const Activity = require('../models/activity.model');
const Analytics = require('../models/analytics.model');

exports.getAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.findOne({
      order: [['createdAt', 'DESC']]
    });

    if (!analytics) {
      return res.status(404).json({
        success: false,
        message: 'No analytics data found'
      });
    }

    res.json({
      success: true,
      data: {
        analytics: {
          subscribers: {
            total: analytics.subscribers,
            growth: analytics.subscriberGrowth
          },
          openRate: {
            rate: analytics.openRate,
            change: analytics.openRateChange
          },
          clickRate: {
            rate: analytics.clickRate,
            change: analytics.clickRateChange
          },
          revenue: {
            total: analytics.revenue,
            growth: analytics.revenueGrowth
          }
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics data'
    });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.findAll({
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    res.json({
      success: true,
      data: { campaigns }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching campaigns'
    });
  }
};

exports.getRecentActivity = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    res.json({
      success: true,
      data: { activities }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching recent activity'
    });
  }
}; 