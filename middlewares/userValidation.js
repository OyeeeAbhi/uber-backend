const {body , validationResult} = require('express-validator');
const errorHandler = require('../utils/errorHandler.js');

const validateCreateUser = [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isString().isLength({min : 3}).withMessage('First name should have the minimum length of 3'),
    body('password').isString().isLength({min : 6}).withMessage('Password must be of 6 characters')
]

const validateUserLogin = [
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
    validateCreateUser,
    validateUserLogin,
    handleValidationErrors
}
