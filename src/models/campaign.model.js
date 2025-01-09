const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Campaign = sequelize.define('Campaign', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('draft', 'active', 'completed', 'paused'),
    defaultValue: 'draft'
  },
  sent: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  openRate: {
    type: DataTypes.STRING,
    defaultValue: '0%'
  },
  clickRate: {
    type: DataTypes.STRING,
    defaultValue: '0%'
  }
});

module.exports = Campaign; 