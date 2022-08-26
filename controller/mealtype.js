//import mealtype schema from model
const mealtype=require("../model/mealtype")

exports.getAllmealtype=(req,res)=>{
    mealtype.find()
    .then(
        result=>{
        res.status(200).json({
            message:"mealtype data fetched",
            data:result
        })
    })
    .catch(error=>{
        res.status(200).json({
            message:"error occur",
            data:error
        })
    })
   
}
