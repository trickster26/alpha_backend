const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Campaign = sequelize.define('Campaign', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('email', 'sms', 'push'),
    defaultValue: 'email'
  },
  status: {
    type: DataTypes.ENUM('draft', 'scheduled', 'active', 'paused', 'completed'),
    defaultValue: 'draft'
  },
  subject: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.TEXT
  },
  scheduledAt: {
    type: DataTypes.DATE
  },
  sentCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  openCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  clickCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  bounceCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  metrics: {
    type: DataTypes.JSON,
    defaultValue: {}
  }
});

module.exports = Campaign; 