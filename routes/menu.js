//import express
const express=require("express")

//import controller
const menuController=require("../controller/menu")

//create routes
const router=express.Router()

//create method
router.get('/',menuController.getAllmenu)

router.get('/:rName',menuController.getAllmenuBYCityId)

//export this routes to your file
module.exports=router;