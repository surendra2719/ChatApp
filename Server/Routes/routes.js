const express=require('express');
const router=express.Router();
const userController=require("../Controllers/user.Controllers");
const chatControllers=require('../Controllers/chat.Controller');
const loginMiddleware=require('../Middleware/authentication')
router.post('/login',userController.login);
router.post('/registration',userController.registration);
router.post('/verifyUser', userController.getUser);
router.post('/resetpassword/:token', loginMiddleware.checkToken,userController.setPassword);
router.post('/addMessage',chatControllers.addMessage);
router.get('/getAllUsers',userController.getAllUsers);
router.get('/getAllChats',chatControllers.getAllUserChats);
module.exports=router;
