const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.MongoDB({
      db: process.env.MONGO_URL
    }),
  ],
});

module.exports = logger;