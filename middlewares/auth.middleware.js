const userModel = require('../models/user.model.js');
const captainModel = require('../models/captain.model.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/errorHandler.js');
const blackListModel = require('../models/blacklist.model.js');


module.exports.authUser = async (req,res,next)=>{
    try{
        const token = req?.cookies?.token || req?.headers?.authorization?.split(' ')[1];
        if(!token){
            return errorHandler(res , 401 , {message : 'Unauthorized'});
        }
        const blackListToken = await blackListModel.findOne({token});
        if(blackListToken){
            return errorHandler(res , 401 , {message : 'Unauthorized'});
        }
        const decoded = jwt.decode(token , process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        req.token = token;
        next();

    }catch(error){
        console.log('ERROR IN AUTH USER FUNCTION' , error);
        return errorHandler(res , 500 , {message : 'INTERNAL SERVER ERROR'});
    }
}

module.exports.authCaptin = async (req,res,next)=>{
    try{
        const token = req?.cookies?.token || req?.headers?.authorization?.split(' ')[1];
        if(!token){
            return errorHandler(res , 401 , {message : 'Unauthorized'});
        }
        const blackListToken = await blackListModel.findOne({token});
        if(blackListToken){
            return errorHandler(res , 401 , {message : 'Unauthorized'});
        }
        const decoded = jwt.decode(token , process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        req.token = token;
        next();

    }catch(error){
        console.log('ERROR IN AUTH Captain FUNCTION' , error);
        return errorHandler(res , 500 , {message : 'INTERNAL SERVER ERROR'});
    }
}