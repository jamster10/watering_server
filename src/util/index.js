
const errorHandler = require('./cors_settings')
const cors_settings = require('./error_handling')
const { morgan_settings } = require('./logging-winston_morgan')

module.exports = {
  errorHandler,
  cors_settings,
  morgan_settings,
}