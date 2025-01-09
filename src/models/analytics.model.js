const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Analytics = sequelize.define('Analytics', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  subscribers: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  subscriberGrowth: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  openRate: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  openRateChange: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  clickRate: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  clickRateChange: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  revenue: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  revenueGrowth: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  }
});

module.exports = Analytics; 