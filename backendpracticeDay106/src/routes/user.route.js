const express=require("express");
const userRouter=express.Router();
const middleware=require("../middlewares/auth.middleware.js");
const userController=require("../controller/user.controller.js")
userRouter.post("/follow/:followerName",middleware,userController.followController)
userRouter.delete("/unfollow/:followerName",middleware,userController.unfollowController)
userRouter.post("/like/:postId",middleware,userController.likeController)
userRouter.post("/follow/accept/:followerName",middleware,userController.acceptFollowController);
userRouter.post("/follow/reject/:followerName",middleware,userController.rejectFollowRequestController);
module.exports=userRouter;