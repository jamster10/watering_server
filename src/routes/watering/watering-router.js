'use strict';

const express = require('express');
const { getShouldWater } = require('./watering-service');
const{ fileSystem } = require("../../util")
const wateringRouter = express.Router();
const moistureDataFile = './src/routes/watering/moisture-data.json'

wateringRouter
  .route('/')
  .post(express.json(), async (req, res, next) => {
    console.log(req.body)
    const { moisture_levels = [] } = req.body;

    if (moisture_levels.length === 3){
      fileSystem.appendMoistureData(moistureDataFile, 
        {[String(Date.now())]: moisture_levels}
      )
      if (moisture_levels.some(v => v >= 700) && getShouldWater() ) {
        return res.json({shouldWater: true})
      }
    }

    return res.json({shouldWater: false})
  }); 

module.exports = wateringRouter;

1598395911714