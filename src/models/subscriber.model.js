const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Subscriber = sequelize.define('Subscriber', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('active', 'unsubscribed', 'bounced'),
    defaultValue: 'active'
  },
  source: {
    type: DataTypes.STRING
  },
  lastActivityAt: {
    type: DataTypes.DATE
  },
  customAttributes: {
    type: DataTypes.JSON,
    defaultValue: {}
  }
});

// Define the associations
Subscriber.associate = (models) => {
  Subscriber.hasMany(models.Activity, {
    foreignKey: 'subscriberId',
    as: 'activities'
  });
};

module.exports = Subscriber; 