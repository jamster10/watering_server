'use strict';

const express = require('express');
const wateringService = require('./watering-service');
const wateringRouter = express.Router();

wateringRouter
  .route('/register')
  .post(express.json(), async (req, res, next) => {

    try {
      const isExistingUser = await wateringService.getUserByUserName(req.app.get('db'), req.body.username)

      if(isExistingUser){
        return res.status(400).json({message: 'User already exists'});
      }

      const newUser = await wateringService.createUser(req.app.get('db'), req.body);
      return res.status(201).json(newUser)
    } catch (e){
      next(e)
    }  
  });
  // .route('/login')
  // .post(express.json(), (req,res,next) => {
  //   const { username, password } = req.body;

  // try {
  //   const isExistingUser = await userService.getUserByUserName(req.app.get('db'), req.body.username)

  //   if(isExistingUser){
  //     return res.status(400).json({message: 'User already exists'});
  //   }
  //           //set up JWT
  //           const subject = user.user_name;
  //           const payload = { user_id: user.id };
  //           res.status(200).send({ token: AuthService.createJwt(subject, payload) });
  //         });

  //     })
  //     .catch(next);
//   // });

// authRouter
//   .route('/refresh')
//   .post(requireAuth, (req, res, next) => {
//     const subject = req.user.user_name;
//     const payload = { user_id: req.user.id };

//     res.status(200).send(AuthService.createJwt(subject, payload));
//   });

module.exports = wateringRouter;