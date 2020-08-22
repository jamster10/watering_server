'use strict';

const { NODE_ENV } = require('../config');
const winston = require('winston');


//For Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'info.log' })
  ]
}); 

module.exports = {
  morgan_settings: NODE_ENV  === 'production' ? 'tiny' : 'dev',
  logger,
};
