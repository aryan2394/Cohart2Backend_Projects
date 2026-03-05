const express=require("express");
const postRouter=express.Router();
const postController=require("../controllers/post.controller.js")
const multer=require("multer");
const upload=multer({storage:multer.memoryStorage()});
const middleware=require("../middlewares/auth.middleware.js");
postRouter.post("/",upload.single("image"),middleware,postController.createPostController);
postRouter.get("/allPosts",middleware,postController.allPostByUserController);
postRouter.get("/postDetails/:postId",middleware,postController.postDetailsController);
module.exports=postRouter;