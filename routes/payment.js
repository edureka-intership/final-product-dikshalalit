//import express
const express=require("express")

//import controller
const paymentController=require("../controller/payment")

//create routes
const router=express.Router()

//create method
router.post('',paymentController.createOrder)

router.post('/save',paymentController.saveTranscation)

//export this routes to your file
module.exports=router;