const express=require("express");
const postRouter=express.Router();
const postController=require("../controllers/post.controller.js")
const multer=require("multer");
const upload=multer({storage:multer.memoryStorage()});
const middleware=require("../middlewares/auth.middleware.js");

// post create karne ke liye ek api banani hai jiska naam hoga / jismein hum post create karenge aur usmein image bhi upload karenge to uske liye multer ka use karenge
postRouter.post("/",upload.single("image"),middleware,postController.createPostController);

// user ke saare post ko fetch karne ke liye ek api banani hai jiska naam hoga /allPosts jismein hum user ke saare post ko fetch karenge aur usse frontend mein dikhaenge
postRouter.get("/allPosts",middleware,postController.allPostByUserController);

// ek post ke details ko fetch karne ke liye ek api banani hai jiska naam hoga /postDetails/:postId jismein hum postId ko url parameter ke through bhejenge aur uske details ko fetch karenge
postRouter.get("/postDetails/:postId",middleware,postController.postDetailsController);

// saare post ko fetch karne ke liye ek api banani hai jiska naam hoga /feed jismein hum saare post ko fetch karenge aur usse frontend mein dikhaenge
postRouter.get("/feed",middleware,postController.feedController);
module.exports=postRouter;