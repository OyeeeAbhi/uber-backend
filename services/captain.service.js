const CaptainModel = require('../models/captain.model.js');
const CaptainRepository = require('../repository/captain.repository.js');

module.exports.createCaptain = async ({firstname , lastname , email , password , color , plate , capacity , vehicleType})=>{
    try{
        const hashedPassord = await CaptainModel.hashPassword(password);
        const Captain = await CaptainRepository.createCaptain({firstname , lastname , email , password : hashedPassord , color , plate , capacity , vehicleType});
        if(Captain?.message){
            return Captain;
        }else{
            const token = Captain.generateAuthToken();
            return {token : token , Captain : Captain};
        }
        
    }catch(error){
        console.log('ERROR IN CREATE Captain FUNCTION OF SERVICE LAYER' , error);
        throw new Error(error);
    }
}

module.exports.CaptainLogin = async ({email , password})=>{
    try{
        const Captain = await CaptainRepository.CaptainLogin({email , password});
        if(!Captain){
            return {message : "Captain NOT FOUND"};
        }else{
            const passwordIsMatched = await Captain.comparePassword(password);
            if(!passwordIsMatched){
                return {message : "PASSWORD IS INCORRECT"};
            }else{
                const token = Captain.generateAuthToken();
                return {token : token , Captain : Captain};
            }
        }
    }catch(error){
        console.log('ERROR IN SERVICE LAYER OF Captain LOGIN FUNCTION',error);
        throw new Error(error);
    }
}

module.exports.logOut = async({token})=>{
    try{
        await CaptainRepository.logOut({token});
    }catch(error){
        console.log('ERROR IN SERVICE LAYER OF LOG OUT FUNCTION' , error);
        throw new Error(error);
    }
}