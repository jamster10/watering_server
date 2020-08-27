const axios = require('axios');
const cron = require('node-cron')
const storage = require('../temp_data')
const { setShouldWater } = require('../routes/watering/watering-service')

const { weatherApiKey, lat, lon } = require("../config.js");

const weatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely, daily&appid=${weatherApiKey}&units=imperial`

const scheduleWeatherData = () => {
  getWeatherTask()
  cron.schedule('0 */3 * * *', () => {
    console.log("Getting Weather Data")
    getWeatherTask()
  })
  console.log("Weather task scheduled every 3 hours")
}

const getWeatherTask = () => axios.get(weatherAPI).then(({ data }) => {
  const currentWeather = {
    weatherCode: data.current.weather[0].id,
    description: data.current.weather[0].description,
    temp: data.current.temp,
    sunrise: data.current.sunrise,
    sunset: data.current.sunset,
  }

  const hourlyWeather = data.hourly.map(hour => ({
    time: new Date(hour.dt * 1000),
    weatherCode: hour.weather[0].id,
    description: hour.weather[0].description,
    temp: hour.temp,
    chanceOfRain: hour.pop * 100  
  }))

  setShouldWater(currentWeather, hourlyWeather)
  storage.weatherData = {
    currentWeather,
    hourlyWeather
  }

}).catch(e => {
  console.log(e)
  console.log("Problem getting weather data")
})

module.exports = scheduleWeatherData;
