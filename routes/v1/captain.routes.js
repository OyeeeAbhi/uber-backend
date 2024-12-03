const express = require('express');
const captainRouter = express.Router();

const captainController = require('../../controllers/captain.controller.js');
const {validateCreateCaptain , handleValidationErrors , validateCaptainLogin} = require('../../middlewares/captain.validation.js');
const authMiddleware = require('../../middlewares/auth.middleware.js');


captainRouter.post('/register' , validateCreateCaptain , handleValidationErrors , captainController.registerCaptain);
captainRouter.post('/login' , validateCaptainLogin, handleValidationErrors , captainController.CaptainLogin);
captainRouter.get('/profile' , authMiddleware.authCaptin , captainController.getCaptainProfile);
captainRouter.post('/logout' , authMiddleware.authCaptin , captainController.logOut);


module.exports = captainRouter;