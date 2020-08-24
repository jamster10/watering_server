const apiRainThreshold = 700;
let shouldWater = false;

const getShouldWater = () => shouldWater;
const setShouldWater = (currentWeather, hourlyWeather) => {
  if (currentWeather.weatherCode < apiRainThreshold) {
    shouldWater = false;
    console.log(currentWeather)
    return;
  }
  for (let hourData = 0; hourData < 11; hourData++) { 
    if (hourlyWeather[hourData].weatherCode < apiRainThreshold) {
      shouldWater = false;
      console.log(hourlyWeather[hourData])
      return;
    }
  }
  shouldWater = true;
}

module.exports = {
  getShouldWater,
  setShouldWater
};