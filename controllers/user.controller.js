const userService = require('../services/user.service.js');
const responseHandler = require('../utils/responseHandler.js');
const errorHandler = require('../utils/errorHandler.js');

module.exports.registerUser = async(req,res)=>{
    try{
        const {fullname, password , email} = req.body;
        let result = await userService.createUser({firstname  : fullname.firstname , lastname : fullname.lastname, password , email});
        if(result?.message){
            return errorHandler(res , 400 , result);
        }else{
            res.cookie('token' , result.token);
            return responseHandler(res , 201 , result , true);
        }
    }catch(error){
        console.log('ERROR OCCURED WHILE REGISTERING THE USER' , error);
        return errorHandler(res , 500 ,error);
    }
}

module.exports.userLogin = async (req,res)=>{
    try{
        const {email , password} = req.body;
        let result = await userService.userLogin({email , password});
        (!result.message) ? res.cookie("token" , result.token) : null;
        if(result.message){
            return responseHandler(res , 404 , result , false)
        }else{
            return responseHandler(res , 200 , result , true)
        }
       
    }catch(error){
        console.log('ERROR OCCURED IN CONTROLLER LAYER OF USER LOGIN FUNCTION' , error);
        return errorHandler(res , 500 ,error);

    }
}

module.exports.getUserProfile = async(req,res)=>{
    try{
        return responseHandler(res , 200 , {user : req.user} , true);
    }catch(error){
        console.log('ERROR IN CONTROLLER LAYER OG GET USER PROFILE' , error);
        return errorHandler(res , 500 , {message : "Internal server error"});
    }
}

module.exports.logOut = async(req,res)=>{
    try{
        const token = req.token;
        await userService.logOut({token});
        res.clearCookie('token');
        return responseHandler(res , 200 , {message : 'USER LOGGED OUT'} , true)
    }catch(error){
        console.log('ERROR IN CONTROLLER LAYER OF LOGOUT FUNCTION' , error);
        return errorHandler(res , 500 ,error);

    }
}