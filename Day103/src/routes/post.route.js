const express=require("express");
const postRouter=express.Router();
const postController=require("../controller/post.controller.js")
const multer=require("multer");
const upload=multer({storage:multer.memoryStorage()});
postRouter.post("/",upload.single("image"),postController.createPostController);
postRouter.get("/",postController.getAllPostByUserController);
postRouter.get("/details/:postId",postController.getPostDetails)
module.exports=postRouter;