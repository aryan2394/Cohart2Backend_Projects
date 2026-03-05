const express=require("express");
const authRouter=express.Router();
const middleware=require("../middlewares/auth.middleware.js")
const authController=require("../controllers/auth.controller.js");
authRouter.post("/register",authController.registerController);
authRouter.post("/login",authController.loginController);
authRouter.get("/get-me",middleware,authController.getMeController)
module.exports=authRouter;