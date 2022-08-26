//import menu schema from model
const menu=require("../model/menu")

exports.getAllmenu=(req,res)=>{
    menu.find()
    .then(
        result=>{
        res.status(200).json({
            message:"menu data fetched",
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


exports.getAllmenuBYCityId=(req,res)=>{

    let filter={restaurantName:req.params.rName}

    menu.find(filter)
    .then(
        result=>{
        res.status(200).json({
            message:"menu data fetched",
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





