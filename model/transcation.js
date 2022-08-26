const mongoose = require("mongoose")

//create schema
const transcationSchema=new mongoose.Schema({
    transcation_id:{
        type:String,
        required:true
    },
    transcation_amount:{
        type:String,
        required:true
    }

})


module.exports=mongoose.model("Transcation",transcationSchema,"transcation")