const userModel = require('../models/user.model.js');
const blackListModel = require('../models//blacklist.model.js');
module.exports.createUser = async({firstname , lastname , email , password})=>{
    try{
        const isUserExist = await userModel.findOne({email});
        if(isUserExist){
            return {message : 'User Already Exist with this Email'};
        }
        const user = await userModel.create({fullname : {firstname , lastname} , email : email , password : password});
        return user;
    }catch(error){
        console.log('ERROR IN CREATE USER FUNCTION OF REPOSITORY' , error);
        throw new Error(error);
    }
}

module.exports.userLogin = async ({email , password})=>{
    try{
        const user = userModel.findOne({email}).select('+password');
        return user;
    }catch(error){
        console.log('ERROR IN REPOSITORY LAYER OF USER LOGIN FUNCTION');
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