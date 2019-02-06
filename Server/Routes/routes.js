const express=require('express');
const router=express.Router();
const userController=require("../Controllers/user.Controllers");
router.post('/login',userController.login);
router.post('/registration',userController.registration);
module.exports=router;