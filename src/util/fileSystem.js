const fs = require('fs').promises;

const fileSystem = {
  appendData: async (location, newData) => {
    try {
      const data = await fs.readFile(location);
      const json = JSON.parse(data)
      json.push(newData)

      fs.writeFile(location, JSON.stringify(json), (err) => {
        if (err) console.log('error', err)
      });
    } catch (e) {
      console.error(e);
    }
  },
  getData: async (location) => {
    try {
      const data = await fs.readFile(location);
      return JSON.parse(data)
    } catch (e) {
      console.error(e);
    }
  },
  writeHTMLData: async (location = '', data) => {
    try {
      await fs.writeFile(location, data)
    }catch (e){
      console.log(e)
      console.log("Could not write data to file.")
    }
  }
}

module.exports = {
  fileSystem,
}
