const userModel=require("../models/user.model.js");
const followModel=require("../models/follow.model.js");
const postModel = require("../models/post.model.js");
const likeModel = require("../models/like.model.js");
async function followController(req,res)
{
    const followerName=req.user.username;
    const {followeeName}=req.params;
    const isFolloweeExist=await userModel.findOne({username:followeeName});
    if(!isFolloweeExist)
    {
        return res.status(404).json({
            "shriji":"followee Account does not exist by shri ji"
        })
    }
    if(followerName==followeeName)
    {
        return res.status(200).json({
            "shriji":"you cannot follow yourself by shri ji"
        })
    }
    const isCombinationExist=await followModel.findOne({
        follower:followerName,
        followee:followeeName,
    })
    if(isCombinationExist)
    {
        // agar pahle se comibatio  exist karta hai then 3 status is possible pending,rejected
        if(isCombinationExist.status=="pending")
        {
            return res.status(200).json({
                "shriji":"you have alredy send the request",
                isCombinationExist
            })
        }
        else if(isCombinationExist.status=="accepted")
        {
            return res.status(200).json({
                "shriji":"request has been accepetd by the user",
                isCombinationExist
            })
        }
        else
        {
            isCombinationExist.status="pending";
            await isCombinationExist.save();
            return res.status(200).json({
                "shriji":"request has been rejeectd by the user but send the request again",
                isCombinationExist
            })
        }
    }
    const newCombination=await followModel.create({
        follower:followerName,
        followee:followeeName,
    })
    res.status(201).json({
        "shriji":`you followed ${followeeName} by shri ji`,
        newCombination
    })
}
async function acceptFollowRequestController(req,res)
{
    const followerName=req.user.username;
    const {followeeName}=req.params;
    const followeeRequest=await followModel.findOne({
        follower:followerName,
        followee:followeeName,
        status:"pending",
    })
    if(!followeeRequest)
    {
        return res.status("No request from the particular followee")
    }
    followeeRequest.status="accepted";
    await followeeRequest.save();
    res.status(200).json({
        "shriji":`you have accepted the request from the followee ${followeeName}`,
        followeeRequest
    })
}
async function rejectFollowRequestController(req,res)
{
    const followerName=req.user.username;
    const {followeeName}=req.params;
    const rejectFolloweeRequest=await followModel.findOne({
        follower:followerName,
        followee:followeeName,
        status:"pending"
    })
    if(!rejectFolloweeRequest)
    {
        return res.status(404).json({
            "shriji":"no request for rejection"
        })
    }
    rejectFolloweeRequest.status="rejected";
    await rejectFolloweeRequest.save();
    res.status(200).json({
        "shriji":`you have rejected the request by ${followeeName}`,
        rejectFolloweeRequest
    })
}
async function unfollowController(req,res)
{
    const followerName=req.user.username;
    const {followeeName}=req.params;
    const isFolloweeExist=await userModel.findOne({username:followeeName});
    if(!isFolloweeExist)
    {
        return res.status(404).json({
            "shriji":"followee Account does not exist by shri ji"
        })
    }
     const isCombinationExist=await followModel.findOne({
        follower:followerName,
        followee:followeeName,
    })
    if(!isCombinationExist)
    {
        return res.status(409).json({
            "shiji":"these combination does not  exist by shri ji",
        })
    }
    const removeConnection=await followModel.findOneAndDelete({
        follower:followerName,
        followee:followeeName,
    })
    res.status(200).json({
        "shriji":`you have unfollowed the ${followeeName} by shri ji`,
        removeConnection
    })
}
async function likeController(req,res)
{
    const {postId}=req.params;
    const user=req.user.username;
    const post=await postModel.findById(postId);
    if(!post)
    {
        return res.status(404).json({
            "shriji":"post not exist by shri ji"
        })
    }
    const likingPostAgain=await likeModel.findOne({
        user:user,
        post:postId
    })
    if(likingPostAgain)
    {
        return res.status(409).json({
            "shriji":"you have already liked the post by shriji"
        })
    }
    const newLikeOnPost=await likeModel.create({
        user:user,
        post:postId
    })
    res.status(201).json({
        "shriji":`liked the post by ${user}`,
        newLikeOnPost
    })
}
module.exports={
    followController,
    acceptFollowRequestController,
    rejectFollowRequestController,
    unfollowController,
    likeController,
}