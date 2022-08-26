const mongoose = require("mongoose")

//create schema
const restaurantSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    city_name:{
        type:String,
        required:true
    },
    city:{
        type:Number,
        required:true
    },
    area:{
        type:Number,
        required:true
    },
    locality:{
        type:String,
        required:true
    },
    thumb:{
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    type:{
        type:Array,
        required:true
    },
    Cuisine:{
        type:Array,
        required:true
    },
    meals:{
        type:String,
        required:true
    }

})


module.exports=mongoose.model("Restaurant",restaurantSchema,"restaurant")