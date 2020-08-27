const fs = require("fs");

const fileSystem = {
  appendMoistureData: (location, newData) => {
    fs.readFile(location, (err, moistureData) => {
      const json = JSON.parse(moistureData)
      json.push(newData)
      fs.writeFile(location, JSON.stringify(json), (err) => {
        if (err) console.log('error', err)
      });
    })
  },
  getData: (location) => {
    fs.readFile(location, (err, data) => {
      return JSON.parse(data)
    })
  }
}

module.exports = {
  fileSystem,
}
