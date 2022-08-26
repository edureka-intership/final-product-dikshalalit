//import express
const express=require("express")

//import controller
const restaurantController=require("../controller/restaurant")

//create routes
const router=express.Router()

//create method
router.get('/',restaurantController.getAllrestaurant)

router.get('/:cID',restaurantController.getAllrestaurantBYCityId)

router.get('/name/:cName',restaurantController.getAllrestaurantBYCityName)

router.post('/filter/:fname/:pageno',restaurantController.getAllRestaurantByFilter)

//export this routes to your file
module.exports=router;