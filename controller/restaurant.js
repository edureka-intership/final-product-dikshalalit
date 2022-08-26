//import restaurant schema from model
const restaurant=require("../model/restaurant")

exports.getAllrestaurant=(req,res)=>{
    restaurant.find()
    .then(
        result=>{
        res.status(200).json({
            message:"restaurant data fetched",
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


exports.getAllrestaurantBYCityId=(req,res)=>{

    let filter={city:req.params.cID}

    restaurant.find(filter)
    .then(
        result=>{
        res.status(200).json({
            message:"restaurant data fetched",
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



exports.getAllrestaurantBYCityName=(req,res)=>{

    let filter={name:req.params.cName}

    restaurant.findOne(filter)
    .then(
        result=>{
        res.status(200).json({
            message:"restaurant data fetched",
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




exports.getAllRestaurantByFilter=(req,res)=>{
    
    let filter={object:req.params.fname}

    //location
    if(req.body.city_id){
        filter.city=req.body.city_id
    }
    //cuisine
    if(req.body.cuisine && req.body.cuisine.length>0){
        filter['Cuisine.name']={$in:req.body.cuisine}
    }

    //cost
    if(req.body.lcost && req.body.hcost){
        if(req.body.lcost==0){
            filter.cost={$lte:req.body.hcost}
        }
        else{
            filter.cost={
                $lt:req.body.hcost,
                $gt:req.body.lcost
            }
        }
    }

    //sort
    let sort=1
    if(req.body.sort){
        sort=req.body.sort
    }







    console.log(filter)
    restaurant.find(filter).limit(2).skip(2*(req.params.pageno-1)).sort({cost:sort})
    .then(result=>{
            console.log(result)
            restaurant.find(filter).count((err,count)=>{
                if(err)
                console.log(err)
                else
                res.status(200).json({
                    message:"Restaurants Fetched By Filter",
                    data:result,
                    totalRecords:count
                })
            })



            
        })

    .catch(
        error=>{
            res.status(500).json({
                message:"error in database",
                error:error
            })
        })
}



