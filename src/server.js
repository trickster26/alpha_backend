const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/database');
const seedDashboardData = require('./seeders/dashboard.seeder');
require('./models'); // This will load all model associations

const app = express();

app.use(cors());
app.use(express.json());

const initializeDatabase = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync all models with database
    await sequelize.sync({ force: true }); // Be careful with force: true in production!
    
    // Seed the database
    await seedDashboardData();
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  }
};

// Initialize database and start server
const PORT = process.env.PORT || 5000;

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
  process.exit(1);
});

module.exports = app; 