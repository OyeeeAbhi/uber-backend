const express = require('express');
const v1router = express.Router();

const userRouter = require('./user.routes.js');
const captainRouter = require('./captain.routes.js');

v1router.use('/v1/user' , userRouter);
v1router.use('/v1/captain' , captainRouter);


module.exports = v1router;