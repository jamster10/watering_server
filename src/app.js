'use strict';
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const { cors_settings, errorHandler, morgan_settings } = require('./util');

const { authenticator, logger } = require ('./middleware');

const  { wateringRouter } = require('./routes')

const app = require('express')();

//set up middleware
app.use(morgan(morgan_settings));
app.use(cors(cors_settings));
app.use(helmet());
app.use(authenticator)
app.use(logger)

//routes
app.use('/watering', wateringRouter);

//handle erroneous endpoints
app.use('*', (req, res, next) => {
  res.status(404).json({message: 'Resource not Found'});
});

//handle any internal errors
app.use(errorHandler);

module.exports = app;