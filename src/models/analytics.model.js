const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Analytics = sequelize.define('Analytics', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  metrics: {
    type: DataTypes.JSON,
    defaultValue: {
      subscribers: {
        total: 0,
        new: 0,
        unsubscribed: 0
      },
      emails: {
        sent: 0,
        opened: 0,
        clicked: 0,
        bounced: 0
      },
      revenue: {
        total: 0,
        fromEmails: 0
      }
    }
  }
});

module.exports = Analytics; 