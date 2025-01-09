const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Activity = sequelize.define('Activity', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM(
      'email_opened',
      'email_clicked',
      'subscription',
      'unsubscription',
      'bounce',
      'complaint'
    ),
    allowNull: false
  },
  subscriberId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  campaignId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  metadata: {
    type: DataTypes.JSON,
    defaultValue: {}
  }
});

// Define the associations
Activity.associate = (models) => {
  Activity.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user'
  });
  Activity.belongsTo(models.Subscriber, {
    foreignKey: 'subscriberId',
    as: 'subscriber'
  });
};

module.exports = Activity; 