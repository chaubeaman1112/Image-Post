const mongoose = require('mongoose');

async function connectDB(){
    await mongoose.connect(process.env.mongo_uri)
    console.log("Database is connected")
}

module.exports= connectDB;

