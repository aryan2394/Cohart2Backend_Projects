const userModel=require("../model/user.model.js");
const followModel=require("../model/follow.model.js");
const postModel=require("../model/post.model.js");
const likeModel = require("../model/like.model.js");
const { mongo, default: mongoose } = require("mongoose");
async function followController(req,res)
{
    const {followerName}=req.params;
    const payload=req.user;
    const followeeName=await userModel.findById(payload.id);
    const isFollowerExist=await userModel.findOne({username:followerName})
    if(!isFollowerExist)
    {
        return res.status(404).json({
            "shiriji":"follower not available by shri ji"
        })
    }
    if(followerName==followeeName.username)
    {
        return res.status(400).json({
            "shriji":"you cannot yourself follow by shri ji"
        })
    }
    const followListDuplicate=await followModel.findOne({
        follower:followerName,
        followee:followeeName.username,
    })
    if(followListDuplicate)
    {
        if(followListDuplicate.status=="accepted")
        {
            return res.status(200).json({
                "shriji":"the request has been fulfilled by shri ji",
                followListDuplicate
            })
        }
        if(followListDuplicate.status=="pending")
        {
            return res.status(200).json({
                "shirji":"the request is pending by shri ji",
                followListDuplicate
            })
        }
        if(followListDuplicate.status=="rejected")
        {
            followListDuplicate.status="pending"
            await followListDuplicate.save();
            return res.status(200).json({
                "shriji":"the request has been rejected by shriji but again requested "
            })
        }
    }
    const followList=await followModel.create({
        follower:followerName,
        followee:followeeName.username,
    })
    res.status(201).json({
        "shriji":followList
    })
}
async function unfollowController(req,res)
{
    const {followerName}=req.params;
    const payload=req.user;
    const isFollowerExist=await userModel.findOne({username:followerName});
    const followeeName=await userModel.findById(payload.id);
    if(!isFollowerExist)
    {
        return res.status(404).json({
            "shriji":"follower not exist by shri ji"
        })
    }
    if(followeeName.username==followerName)
    {
        return res.status(400).json({
            "shriji":"you cannot unfollow yourself"
        })
    }
    const isCombinationExist=await followModel.findOne({
        follower:followerName,
        followee:followeeName.username
    })
    if(!isCombinationExist)
    {
        return res.status(409).json({
            "shriji":"not exist the combiantion by shri ji"
        })
    }
    const deleteTheCombination=await followModel.deleteOne({
        follower:followerName,
        followee:followeeName.username
    })
    res.status(200).json({
        "shriji":deleteTheCombination
    })
}
async function likeController(req,res)
{
    const {postId}=req.params;
    const payload=req.user;
    const isValidPostId=mongoose.Types.ObjectId.isValid(postId);
    if(!isValidPostId)
    {
        return res.status(400).json({
            "shriji":"not a vlid posturl by shri ji"
        })
    }
    const user=await userModel.findById(payload.id);
    const post=await postModel.findById(postId);
    if(!post)
    {
        return res.status(404).json({
            "shriji":"post not available by shri ji"
        })
    }
    const isLiKeAlready=await likeModel.findOne({
        postUrl:postId,
        user:user.username
    })
    if(isLiKeAlready)
    {
        return res.status(409).json({
            "shriji":"already liked by shri ji"
        })
    }
    const likePost=await likeModel.create({
        postUrl:postId,
        user:user.username
    })
    res.status(201).json({
        "shriji":likePost
    })
}
async function acceptFollowController(req,res)
{
    const payload=req.user;
    const {followerName}=req.params;
    if(!followerName)
    {
        return res.status(404).json({
            "shriji":"no follower exists of the username you provided by shri ji"
        })
    }
    const followeeName=await userModel.findById(payload.id);
    const isFollowRequestAvalaible=await followModel.findOneAndUpdate({
        follower:followerName,
        followee:followeeName.username,
        status:"pending"
    }
    ,{
        $set:{status:"success"}
    }
)
    if(!isFollowRequestAvalaible)
    {
        return res.status(404).json({
            "shriji":"no pending request avalaible"
        })
    }
    res.status(200).json({
        "shriji":"accepted the request from the followee by shriji"
    })
}
async function rejectFollowRequestController(req,res)
{
    const payload=req.user;
    const {followerName}=req.params;
    const followeeName=await userModel.findById(payload.id);
    if(!followerName)
    {
        return res.status(404).json({
            "shriji":"follower not found by shri ji"
        })
    }
    const rejectRequest=await followModel.findOneAndUpdate(
        {
            follower:followerName,
            followee:followeeName.username,
            status:"pending"
        },
        {
            $set:{status:"rejected"}
        }
    )
    if(!rejectRequest)
    {
        return res.status(404).json({
            "shriji":"no penidng request avalaiable by shri ji"
        })
    }
    res.status(404).json({
        "shriji":"rejectd the follow request",
        rejectRequest
    })
}
module.exports={
    followController,
    unfollowController,
    likeController,
    acceptFollowController,
    rejectFollowRequestController,
}   