const CaptainService = require('../services/captain.service.js');
const responseHandler = require('../utils/responseHandler.js');
const errorHandler = require('../utils/errorHandler.js');

module.exports.registerCaptain = async(req,res)=>{
    try{
        const {fullname, password , email , vehicle} = req.body;
        let result = await CaptainService.createCaptain({firstname  : fullname.firstname , lastname : fullname.lastname, password , email , color : vehicle.color , plate : vehicle.plate , capacity : vehicle.capacity , vehicleType : vehicle.vehicleType});
        if(result?.message){
            return errorHandler(res , 400 , result);
        }else{
            res.cookie('token' , result.token);
            return responseHandler(res , 201 , result , true);
        }
    }catch(error){
        console.log('ERROR OCCURED WHILE REGISTERING THE Captain' , error);
        return errorHandler(res , 500 ,error);
    }
}

module.exports.CaptainLogin = async (req,res)=>{
    try{
        const {email , password} = req.body;
        let result = await CaptainService.CaptainLogin({email , password});
        (!result.message) ? res.cookie("token" , result.token) : null;
        if(result.message){
            return responseHandler(res , 404 , result , false)
        }else{
            return responseHandler(res , 200 , result , true)
        }
       
    }catch(error){
        console.log('ERROR OCCURED IN CONTROLLER LAYER OF Captain LOGIN FUNCTION' , error);
        return errorHandler(res , 500 ,error);

    }
}

module.exports.getCaptainProfile = async(req,res)=>{
    try{
        return responseHandler(res , 200 , {captain : req.captain} , true);
    }catch(error){
        console.log('ERROR IN CONTROLLER LAYER OG GET Captain PROFILE' , error);
        return errorHandler(res , 500 , {message : "Internal server error"});
    }
}

module.exports.logOut = async(req,res)=>{
    try{
        const token = req.token;
        await CaptainService.logOut({token});
        res.clearCookie('token');
        return responseHandler(res , 200 , {message : 'CAPTAIN LOGGED OUT'} , true)
    }catch(error){
        console.log('ERROR IN CONTROLLER LAYER OF LOGOUT FUNCTION' , error);
        return errorHandler(res , 500 ,error);

    }
}