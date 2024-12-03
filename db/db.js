const mongoose = require('mongoose');

async function connectToDB(){
    try{
       await mongoose.connect(process.env.DB_URL);
       console.log('Successfully Connected to Database');
    }catch(error){
        console.log('ERROR CONNECTING TO DB' , error);
    }
}
module.exports = connectToDB;