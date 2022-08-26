const mongoose = require("mongoose")

//create schema
const mealtypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }

})
module.exports=mongoose.model("Mealtype",mealtypeSchema,"mealtype")