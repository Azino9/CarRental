const express = require('express');
const { registerUser, loginUser, getUserData, getUserCars } = require('../Controllers/userController.js');
const { protect } = require('../Middleware/auth.js');
const userRouter = express.Router();


userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/data',protect,getUserData )
userRouter.get('/cars',getUserCars )

module.exports = userRouter;
