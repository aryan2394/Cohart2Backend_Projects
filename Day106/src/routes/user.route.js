const express=require("express");
const userRouter=express.Router();
const middleware=require("../middlewares/auth.middlewares.js");
const userController=require("../controllers/user.controller.js");
userRouter.post("/follow/:username",middleware,userController.followController);
userRouter.delete("/unfollow/:username",middleware,userController.unfollowController);
userRouter.post("/likes/:postId",middleware,userController.likeController);
module.exports=userRouter;