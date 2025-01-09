const winston = require('winston');

// Create a Winston logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Write all logs to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    // Write all logs with level 'error' and below to error.log
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // Write all logs with level 'info' and below to combined.log
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

module.exports = logger; 