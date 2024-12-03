const {body , validationResult} = require('express-validator');
const errorHandler = require('../utils/errorHandler.js');

const validateCreateCaptain = [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isString().isLength({min : 3}).withMessage('First name should have the minimum length of 3'),
    body('password').isString().isLength({min : 6}).withMessage('Password must be of atleast 6 characters'),
    body('vehicle.plate').isString().isLength({min : 3}).withMessage('plate must be of atleast 3 character'),
    body('vehicle.color').isString().isLength({min : 3}).withMessage('color must be of atleast 3 character'),
    body('vehicle.capacity').isInt().isLength({min : 1}).withMessage('capacity must be of atleast 1 character'),
    body('vehicle.vehicleType').isString().isLength({min : 3}).withMessage('vehicle type must be of atleast 3 character')
]

const validateCaptainLogin = [
    body('email').isEmail().withMessage('InValid Email'),
    body('password').isString().isLength({min : 6}).withMessage('Password must be of 6 characters')
]

const handleValidationErrors  = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return errorHandler(res , 400 , errors)
    }else{
        next();
    }
}

module.exports = {
    validateCreateCaptain,
    validateCaptainLogin,
    handleValidationErrors
}
