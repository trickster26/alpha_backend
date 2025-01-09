const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  logging: (msg) => logger.debug(msg)
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