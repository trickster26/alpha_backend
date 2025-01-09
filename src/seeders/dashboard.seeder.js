const Campaign = require('../models/campaign.model');
const Activity = require('../models/activity.model');
const Analytics = require('../models/analytics.model');

async function seedDashboardData() {
  try {
    // Seed Campaigns
    await Campaign.bulkCreate([
      {
        name: 'Summer Sale 2024',
        status: 'active',
        sent: 1500,
        openRate: '45%',
        clickRate: '12%'
      },
      {
        name: 'Welcome Series',
        status: 'draft',
        sent: 0,
        openRate: '0%',
        clickRate: '0%'
      },
      {
        name: 'Spring Collection',
        status: 'completed',
        sent: 2500,
        openRate: '38%',
        clickRate: '15%'
      }
    ]);

    // Seed Activities
    await Activity.bulkCreate([
      {
        type: 'email_opened',
        user: 'John Doe',
        email: 'john@example.com'
      },
      {
        type: 'subscription',
        user: 'Jane Smith',
        email: 'jane@example.com'
      },
      {
        type: 'purchase',
        user: 'Mike Johnson',
        email: 'mike@example.com'
      }
    ]);

    // Seed Analytics
    await Analytics.create({
      subscribers: 1234,
      subscriberGrowth: 12.5,
      openRate: 45.2,
      openRateChange: 5.8,
      clickRate: 24.8,
      clickRateChange: -2.4,
      revenue: 12500,
      revenueGrowth: 8.2
    });

    console.log('Dashboard data seeded successfully');
  } catch (error) {
    console.error('Error seeding dashboard data:', error);
  }
}

module.exports = seedDashboardData; 