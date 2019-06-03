const config = require('config');
const winston = require('winston');

const logger = winston.createLogger({
    level: config.get('logger.level'),
    format: winston.format.json(),
    defaultMeta: { service: 'eq-log-parser' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({ filename: config.get('logger.errorFileName'), level: 'error' }),
      new winston.transports.File({ filename: config.get('logger.logFileName') })
    ]
});

module.exports = logger; 