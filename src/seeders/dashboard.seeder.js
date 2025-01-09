const { User, Campaign, Subscriber, Activity, Analytics } = require('../models');
const argon2 = require('argon2');
const { v4: uuidv4 } = require('uuid');

async function seedDashboardData() {
  try {
    // Create test user
    const hashedPassword = await argon2.hash('password123', 10);
    const user = await User.create({
      id: uuidv4(),
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: hashedPassword,
      role: 'admin',
      isEmailVerified: true,
      lastLogin: new Date()
    });

    // Create subscribers
    const subscribers = await Subscriber.bulkCreate([
      {
        id: uuidv4(),
        userId: user.id,
        email: 'subscriber1@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        status: 'active',
        source: 'website',
        lastActivityAt: new Date(),
        customAttributes: {
          company: 'Acme Inc',
          plan: 'premium'
        }
      },
      {
        id: uuidv4(),
        userId: user.id,
        email: 'subscriber2@example.com',
        firstName: 'Mike',
        lastName: 'Johnson',
        status: 'active',
        source: 'import',
        lastActivityAt: new Date(),
        customAttributes: {
          company: 'Tech Corp',
          plan: 'basic'
        }
      }
      // Add more subscribers as needed
    ]);

    // Create campaigns
    const campaigns = await Campaign.bulkCreate([
      {
        id: uuidv4(),
        userId: user.id,
        name: 'Welcome Series',
        type: 'email',
        status: 'active',
        subject: 'Welcome to Our Platform',
        content: 'Welcome email content...',
        sentCount: 150,
        openCount: 85,
        clickCount: 45,
        metrics: {
          deliveryRate: 98,
          unsubscribeRate: 0.5
        }
      },
      {
        id: uuidv4(),
        userId: user.id,
        name: 'Monthly Newsletter',
        type: 'email',
        status: 'scheduled',
        subject: 'January Updates',
        content: 'Newsletter content...',
        scheduledAt: new Date(Date.now() + 86400000), // Tomorrow
        metrics: {
          estimatedReach: 1000
        }
      }
      // Add more campaigns as needed
    ]);

    // Create activities
    const activities = await Activity.bulkCreate([
      {
        id: uuidv4(),
        userId: user.id,
        type: 'email_opened',
        subscriberId: subscribers[0].id,
        campaignId: campaigns[0].id,
        metadata: {
          device: 'mobile',
          location: 'US'
        }
      },
      {
        id: uuidv4(),
        userId: user.id,
        type: 'email_clicked',
        subscriberId: subscribers[1].id,
        campaignId: campaigns[0].id,
        metadata: {
          link: 'https://example.com/product',
          device: 'desktop'
        }
      }
      // Add more activities as needed
    ]);

    // Create analytics data for the last 30 days
    const today = new Date();
    const analytics = [];

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      analytics.push({
        id: uuidv4(),
        userId: user.id,
        date: date,
        metrics: {
          subscribers: {
            total: 1000 + Math.floor(Math.random() * 50),
            new: Math.floor(Math.random() * 20),
            unsubscribed: Math.floor(Math.random() * 5)
          },
          emails: {
            sent: 500 + Math.floor(Math.random() * 100),
            opened: 300 + Math.floor(Math.random() * 50),
            clicked: 150 + Math.floor(Math.random() * 30),
            bounced: Math.floor(Math.random() * 10)
          },
          revenue: {
            total: 1000 + Math.floor(Math.random() * 500),
            fromEmails: 800 + Math.floor(Math.random() * 400)
          }
        }
      });
    }

    await Analytics.bulkCreate(analytics);

    console.log('Dashboard data seeded successfully');
  } catch (error) {
    console.error('Error seeding dashboard data:', error);
    throw error;
  }
}

module.exports = seedDashboardData; 