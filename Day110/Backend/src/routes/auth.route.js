const express=require("express");
const authRouter=express.Router();
const middleware=require("../middlewares/auth.middleware.js")
const authController=require("../controllers/auth.controller.js");

// register aur login ke liye do api banani hai jiska naam hoga /register aur /login jismein hum user ke details ko bhejenge aur uske hisab se user ko register ya login karenge
authRouter.post("/register",authController.registerController);
authRouter.post("/login",authController.loginController);

// iska kaam hoga ki user ke details ko fetch karna jab user login ho jaye to uske details ko fetch karne ke liye ek api banani hai jiska naam hoga /get-me jismein hum user ke details ko fetch karenge aur usse frontend mein dikhaenge
authRouter.get("/get-me",middleware,authController.getMeController)
module.exports=authRouter;