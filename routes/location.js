//import express
const express=require("express")

//import controller
const LocationController=require("../controller/location")

//create routes
const router=express.Router()

//create method
router.get('/location',LocationController.getAllLocation)

//export this routes to your file
module.exports=router;