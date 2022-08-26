//import location schema from model
const location=require("../model/location")

exports.getAllLocation=(req,res)=>{
    location.find()
    .then(
        result=>{
        res.status(200).json({
            message:"location data fetched",
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
