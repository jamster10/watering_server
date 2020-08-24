const scheduleWeatherData = require('./get-weather-data')

const initializeJobs = (tasks) => {

  for (const task in tasks) {
    if (tasks[task]) {
      scheduler[task]
    }
  }
}

const scheduler = {
  weather: scheduleWeatherData()
}

module.exports = initializeJobs