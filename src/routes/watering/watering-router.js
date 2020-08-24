'use strict';

const express = require('express');
const { getShouldWater } = require('./watering-service');
const wateringRouter = express.Router();

wateringRouter
  .route('/')
  .post(express.json(), async (req, res, next) => {
    console.log(req.body)
    const { moisture_level } = req.body;
    if (moisture_level >= 700 && getShouldWater() ) {
      return res.json({shouldWater: true})
    }
    return res.json({shouldWater: false})
  });

module.exports = wateringRouter;