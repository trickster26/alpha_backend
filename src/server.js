const seedDashboardData = require('./seeders/dashboard.seeder');

// After your database connection is established
sequelize.sync({ force: true }) // Be careful with force: true in production!
  .then(() => {
    return seedDashboardData();
  })
  .then(() => {
    console.log('Database synced and seeded');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  }); 