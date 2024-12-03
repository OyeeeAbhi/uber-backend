const userModel = require('../models/user.model.js');
const userRepository = require('../repository/user.repository.js');

module.exports.createUser = async ({firstname , lastname , email , password})=>{
    try{
        const hashedPassord = await userModel.hashPassword(password);
        const user = await userRepository.createUser({firstname , lastname , email , password : hashedPassord});
        if(user?.message){
            return Captain;
        }else{
            const token = user.generateAuthToken();
            return {token : token , user : user};
        }
        
    }catch(error){
        console.log('ERROR IN CREATE USER FUNCTION OF SERVICE LAYER' , error);
        throw new Error(error);
    }
}

module.exports.userLogin = async ({email , password})=>{
    try{
        const user = await userRepository.userLogin({email , password});
        if(!user){
            return {message : "USER NOT FOUND"};
        }else{
            const passwordIsMatched = await user.comparePassword(password);
            if(!passwordIsMatched){
                return {message : "PASSWORD IS INCORRECT"};
            }else{
                const token = user.generateAuthToken();
                return {token : token , user : user};
            }
        }
    }catch(error){
        console.log('ERROR IN SERVICE LAYER OF USER LOGIN FUNCTION',error);
        throw new Error(error);
    }
}

module.exports.logOut = async({token})=>{
    try{
        await userRepository.logOut({token});
    }catch(error){
        console.log('ERROR IN SERVICE LAYER OF LOG OUT FUNCTION' , error);
        throw new Error(error);
    }
}