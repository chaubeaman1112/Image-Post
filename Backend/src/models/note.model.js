const mongoose = require('mongoose');

const posts= new mongoose.Schema({
    images:String,
    caption:String
})

const postmodel= mongoose.model("post",posts)

module.exports= postmodel