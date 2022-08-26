//import express
const express=require("express")

//import controller
const signinController=require("../controller/signin")

//create routes
const router=express.Router()

//create method
router.post('/usersdata',signinController.getAllsignin)

router.post('/userlogin',signinController.getAlllogin)

//export this routes to your file
module.exports=router;