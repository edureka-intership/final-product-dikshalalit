const mongoose = require("mongoose")

//create schema
const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city_id: {
        type: Number,
        required: true
    },
    location_id: {
        type: Number,
        required: true
    },
    country_name: {
        type: String,
        required: true
    },
    city_name: {
        type: String,
        required: true
    },
    
})
module.exports=mongoose.model("Location",locationSchema,"location")