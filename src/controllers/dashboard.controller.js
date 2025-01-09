const { Op } = require('sequelize');
const Campaign = require('../models/campaign.model');
const Activity = require('../models/activity.model');
const Analytics = require('../models/analytics.model');
const Subscriber = require('../models/subscriber.model');

exports.getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    const thirtyDaysAgo = new Date(today - 30 * 24 * 60 * 60 * 1000);

    // Get analytics for last 30 days
    const analytics = await Analytics.findAll({
      where: {
        userId,
        date: {
          [Op.between]: [thirtyDaysAgo, today]
        }
      },
      order: [['date', 'DESC']]
    });

    // Calculate totals and growth
    const currentPeriod = analytics.slice(0, 15);
    const previousPeriod = analytics.slice(15, 30);

    const calculateMetrics = (period) => {
      return period.reduce((acc, day) => {
        acc.subscribers.total += day.metrics.subscribers.new;
        acc.subscribers.unsubscribed += day.metrics.subscribers.unsubscribed;
        acc.emails.sent += day.metrics.emails.sent;
        acc.emails.opened += day.metrics.emails.opened;
        acc.emails.clicked += day.metrics.emails.clicked;
        acc.revenue.total += day.metrics.revenue.total;
        return acc;
      }, {
        subscribers: { total: 0, unsubscribed: 0 },
        emails: { sent: 0, opened: 0, clicked: 0 },
        revenue: { total: 0 }
      });
    };

    const current = calculateMetrics(currentPeriod);
    const previous = calculateMetrics(previousPeriod);

    // Calculate growth rates
    const calculateGrowth = (current, previous) => {
      return ((current - previous) / previous) * 100 || 0;
    };

    res.json({
      success: true,
      data: {
        analytics: {
          subscribers: {
            total: current.subscribers.total,
            growth: calculateGrowth(
              current.subscribers.total,
              previous.subscribers.total
            )
          },
          openRate: {
            rate: (current.emails.opened / current.emails.sent) * 100 || 0,
            change: calculateGrowth(
              current.emails.opened / current.emails.sent,
              previous.emails.opened / previous.emails.sent
            )
          },
          clickRate: {
            rate: (current.emails.clicked / current.emails.sent) * 100 || 0,
            change: calculateGrowth(
              current.emails.clicked / current.emails.sent,
              previous.emails.clicked / previous.emails.sent
            )
          },
          revenue: {
            total: current.revenue.total,
            growth: calculateGrowth(
              current.revenue.total,
              previous.revenue.total
            )
          }
        }
      }
    });
  } catch (error) {
    console.error('Error in getAnalytics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics data'
    });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const userId = req.user.id;
    const campaigns = await Campaign.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 5,
      attributes: [
        'id',
        'name',
        'status',
        'type',
        'sentCount',
        'openCount',
        'clickCount',
        'scheduledAt',
        'createdAt'
      ]
    });

    const formattedCampaigns = campaigns.map(campaign => ({
      ...campaign.toJSON(),
      openRate: `${((campaign.openCount / campaign.sentCount) * 100 || 0).toFixed(1)}%`,
      clickRate: `${((campaign.clickCount / campaign.sentCount) * 100 || 0).toFixed(1)}%`
    }));

    res.json({
      success: true,
      data: { campaigns: formattedCampaigns }
    });
  } catch (error) {
    console.error('Error in getCampaigns:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching campaigns'
    });
  }
};

exports.getRecentActivity = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      include: [
        {
          model: Subscriber,
          as: 'subscriber',
          attributes: ['id', 'name', 'email']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    res.json(activities);
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    res.status(500).json({ message: 'Error fetching recent activity' });
  }
}; 