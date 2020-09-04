const express = require('express');

const { getShouldWater } = require('./watering-service');

const { fileSystem } = require("../../util")
const { generateGraph } = require('../../util/generateGraph')
const authenticator = require('../../middleware/authenticator')

const wateringRouter = express.Router();
const moistureDataFile = './src/routes/watering/moisture-data.json'

wateringRouter
  .route('/')
  .get(async (req, res, next) => {
    const data = await fileSystem.getData(moistureDataFile)
    const lastPost = data[data.length - 1]

    const key = Object.keys(lastPost)[0]
    const date = new Date(Number(key)).toLocaleString()
    return res.json({ date, data: lastPost[key] })
  })
  .post(authenticator, express.json(), async (req, res, next) => {
    console.log(req.body)
    const { moisture_levels = [] } = req.body;

    if (moisture_levels.length === 3) {
      fileSystem.appendData(moistureDataFile,
        { [String(Date.now())]: moisture_levels }
      )
      if (moisture_levels.some(v => v >= 700) && getShouldWater()) {
        return res.json({ shouldWater: true })
      }
    }
    return res.json({ shouldWater: false })
  })
  .delete(authenticator, express.json(), async (req, res, next) => {
    try {
      await fileSystem.clearLastEntry(moistureDataFile);
      return res.json({ success: true })
    } catch (e) {
      console.log(e);
      return res.json({ success: false })
    }
  });

wateringRouter
  .route('/data')
  .get(async (req, res, next) => {
    try {
      const data = await fileSystem.getData(moistureDataFile)
      return res.json({ dataset: data })
    } catch (e) {
      // console.log(e)
      return res.json({ error: 'couldnt get data' })
    }
  })
  .delete(authenticator, express.json(), async (req, res, next) => {
    try {
      await fileSystem.clearData(moistureDataFile);
      return res.json({ success: true })
    } catch (e) {
      console.log(e);
      return res.json({ success: false })
    }
  });

wateringRouter
  .route('/graph')
  .get(async (req, res, next) => {
    try {
      await generateGraph()
      return res.sendFile(__dirname + '/moisture-graph.html');

    } catch (e) {
      // console.log(e)
      res.json({ error: 'didnt work' })
    }
  })

module.exports = wateringRouter;
