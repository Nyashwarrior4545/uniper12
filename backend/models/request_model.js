
//model/request_model.js

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const requestSchema = new Schema({
    request_Name: {
        type: String,
        requried: true
    },
    Category:{
        type:String,
        required:true
    },
    Status: {
        type: String,
        required: true
    },
    attachedFile: {
        type: String // This will store the file name or file path
    },
    senderUsername: {
        type: String
    }

}, {timestamps: true}) // creates a collection // creates a collection

module.exports = mongoose.model('requests', requestSchema)// this will pularise and make a workout collection