const Campaign = require('./campaign.model');
const Activity = require('./activity.model');
const Analytics = require('./analytics.model');
const Subscriber = require('./subscriber.model');
const User = require('./user.model');

// User associations
User.hasMany(Campaign, { foreignKey: 'userId' });
User.hasMany(Subscriber, { foreignKey: 'userId' });
User.hasMany(Activity, { foreignKey: 'userId' });
User.hasMany(Analytics, { foreignKey: 'userId' });

// Campaign associations
Campaign.belongsTo(User, { foreignKey: 'userId' });
Campaign.hasMany(Activity, { foreignKey: 'campaignId' });

// Subscriber associations
Subscriber.belongsTo(User, { foreignKey: 'userId' });
Subscriber.hasMany(Activity, { foreignKey: 'subscriberId' });

// Activity associations
Activity.belongsTo(User, { foreignKey: 'userId' });
Activity.belongsTo(Campaign, { foreignKey: 'campaignId' });
Activity.belongsTo(Subscriber, { foreignKey: 'subscriberId' });

// Analytics associations
Analytics.belongsTo(User, { foreignKey: 'userId' });

// Initialize models
const models = {
  Activity: require('./activity.model'),
  Subscriber: require('./subscriber.model'),
  Campaign: require('./campaign.model'),
  Analytics: require('./analytics.model'),
  User: require('./user.model')
};

// Run associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models; 