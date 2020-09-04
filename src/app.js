'use strict';
require('dotenv').config();
const morgan = require('morgan');
const helmet = require('helmet');
const app = require('express')();

const { errorHandler, morgan_settings } = require('./util');
const { logger } = require ('./middleware');
const  { wateringRouter } = require('./routes')

app.use(morgan(morgan_settings));
app.use(helmet());
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
