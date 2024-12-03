const express = require('express');
const userRouter = express.Router();

const userController = require('../../controllers/user.controller.js');
const {validateCreateUser , handleValidationErrors , validateUserLogin} = require('../../middlewares/userValidation.js');
const authMiddleware = require('../../middlewares/auth.middleware.js');


userRouter.post('/register' , validateCreateUser , handleValidationErrors , userController.registerUser);
userRouter.post('/login' , validateUserLogin, handleValidationErrors , userController.userLogin);
userRouter.get('/profile' , authMiddleware.authUser , userController.getUserProfile);
userRouter.post('/logout' , authMiddleware.authUser , userController.logOut);


module.exports = userRouter;