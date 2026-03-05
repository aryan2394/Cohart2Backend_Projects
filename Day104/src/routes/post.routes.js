const express=require("express");
const postRouter=express.Router();
const postController=require("../controllers/post.controller.js")
const multer=require("multer");
const upload=multer({storage:multer.memoryStorage()});
postRouter.post("/",upload.single("image"),postController.createPostController);
postRouter.get("/allPosts",postController.getAllPostByUserController);
postRouter.get("/postDetails/:postId",postController.getPostDetailsController);
module.exports=postRouter;