const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');
require('dotenv').config();

// Create Sequelize instance with proper configuration
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: (msg) => logger.debug(msg),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Database connection function
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established successfully.');
    
    // Sync all models
    await sequelize.sync();
    logger.info('Database models synchronized');
  } catch (err) {
    logger.error('Unable to connect to the database:', err);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB }; 