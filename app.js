const dotenv = require('dotenv');
dotenv.config();

//module imports
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')

//custom imports
const connectToDB =  require('./db/db.js');
const v1router = require('./routes/v1/router.index.js');


//registering middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(v1router);

//DB connection
connectToDB();

//exporting the app
module.exports = app