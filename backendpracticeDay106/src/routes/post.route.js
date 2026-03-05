const express=require("express");
const postRouter=express.Router();
const multer=require("multer");
const upload=multer({storage:multer.memoryStorage()});
const middleware=require("../middlewares/auth.middleware.js");
const postController=require("../controller/post.controller.js");
postRouter.post("/",upload.single("image"),middleware,postController.createPostController);
postRouter.get("/allPosts",middleware,postController.allPostByUserController);
postRouter.get("/post/:postId",middleware,postController.postDetailsController)
module.exports=postRouter;