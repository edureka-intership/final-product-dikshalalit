//import express
const express=require("express")

//import controller
const mealtypeController=require("../controller/mealtype")

//create routes
const router=express.Router()

//create method
router.get('/mealtype',mealtypeController.getAllmealtype)

//export this routes to your file
module.exports=router;