require('dotenv').config();
const mongoose = require('mongoose');

const DB = process.env.DATABASE
const PORT = process.env.PORT

mongoose.connect(DB).then(()=>{
    console.log('Database Connected')
}).catch((error)=>{
    console.log('Failed to connect to Database: ' + error.message)
});