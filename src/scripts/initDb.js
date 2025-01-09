const { sequelize } = require('../config/database');
const User = require('../models/user.model');
const logger = require('../utils/logger');

async function initDb() {
  try {
    // Force sync will drop existing tables and recreate them
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.sync({ force: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    logger.info('Database tables created successfully');

    // Create admin user
    await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: 'Admin@123',
      role: 'admin',
      isEmailVerified: true
    });
    
    logger.info('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Database initialization failed:', error);
    process.exit(1);
  }
}

initDb(); 