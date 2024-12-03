const CaptainModel = require('../models/captain.model.js');
const blackListModel = require('../models//blacklist.model.js');
const captainModel = require('../models/captain.model.js');

module.exports.createCaptain = async({firstname , lastname , email , password , color , capacity , vehicleType , plate})=>{
    try{
        const isCaptainExist = await captainModel.findOne({email});
        if(isCaptainExist){
            return {message : 'Captain Already Exist with this Email'};
        }else{
            const Captain = await CaptainModel.create({fullname : {firstname , lastname} , email : email , password : password , vehicle : { color , capacity , vehicleType , plate}});
            return Captain;
        }
        
    }catch(error){
        console.log('ERROR IN CREATE Captain FUNCTION OF REPOSITORY' , error);
        throw new Error(error);
    }
}

module.exports.CaptainLogin = async ({email , password})=>{
    try{
        const Captain = CaptainModel.findOne({email}).select('+password');
        return Captain;
    }catch(error){
        console.log('ERROR IN REPOSITORY LAYER OF Captain LOGIN FUNCTION');
        throw new Error(error);
    }
}

module.exports.logOut = async ({token})=>{
    try{
        const blackListToken = await blackListModel.create({token : token});
        return blackListToken
    }catch(error){
        console.log('ERROR IN REPOSITORY LAYER OF LOG OUT FUNCTION' , error);
        throw new Error(error);
    }
}