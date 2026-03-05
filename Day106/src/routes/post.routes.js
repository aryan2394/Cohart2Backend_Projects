const express=require("express");
const postRouter=express.Router();
const postController=require("../controllers/post.controller.js")
const multer=require("multer");
const upload=multer({storage:multer.memoryStorage()});
const middleware=require("../middlewares/auth.middlewares.js");
postRouter.post("/",upload.single("image"),middleware,postController.createPostController);
postRouter.get("/allPosts",middleware,postController.getAllPostByUserController);
postRouter.get("/postDetails/:postId",middleware,postController.getPostDetailsController);
module.exports=postRouter;