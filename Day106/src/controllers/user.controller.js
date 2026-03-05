const followModel=require("../models/follow.model.js");
const userModel=require("../models/user.model.js");
const postModel=require("../models/post.model.js");
const likeModel=require("../models/like.model.js");
async function followController(req,res)
{
    const {username}=req.user;
    const followeeUsername=req.params.username;
    // ab kuch checks lagao taaki server crash n karein and galat data n jaaye 
    // 1:aiasa n ho ki follwer apne aap ko hi follow kar le 
    // 2:humne userFollower ko toh valid kar liya hai ki wo hai ya nahi and valid hai ya nahi lekin humein check karna padega ki followee exists karta hai bhi ya nahi 
    // ya wo exist hi nahi karta hai 
    // 3:aisa n ho ki ek user dusre ko follow karein 1000 baar sirf ek hi baar karna chahiye 
    if(username==followeeUsername)
    {
        return res.status(400).json({
            "shriji":"you cannot foolow yourself by shriji"
        })
    }
    const isFolloweeExist=await userModel.findOne({username:followeeUsername});
    if(!isFolloweeExist)
    {
        return res.status(400).json({
            "shriji":"followee not exists by shri ji"
        })
    }
    const isFollowFolloweeExists=await followModel.findOne({
        follower:username,
        followee:followeeUsername
    })
    if(isFollowFolloweeExists)
    {
        return res.status(200).json({
            "shriji":"same follwer and followee by shri ji"
        })
    }
    console.log(username,followeeUsername);
    const followed=await followModel.create({
        follower:username,
        followee:followeeUsername
    })
    res.status(201).json({
        shriji:"followed to shri ji"
    })
}
async function unfollowController(req,res)
{
    const {username}=req.user;
    const unfollowerName=req.params.username;
    if(username==unfollowerName)
    {
        return res.status(400).json({
            "shriji":"you cannot unfollow yourself by shri ji"
        })
    }
    const isFolloweeExist=await userModel.findOne({username:unfollowerName});
    if(!isFolloweeExist)
    {
        return res.status(400).json({
            "shriji":"followee not exists by shri ji"
        })
    }
    const findFollowerFollowee=await followModel.findOne({
        follower:username,
        followee:unfollowerName
    })
    if(!findFollowerFollowee)
    {
        return res.status(400).json({
            "shriji":"data you are trying to remove not exists by shri ji"
        })
    }
    const deleteFollowerFollowee=await followModel.findOneAndDelete({
        follower:username,
        followee:unfollowerName
    })
    console.log(username,unfollowerName);
    res.status(200).json({
        "shriji":`you have removed the follower ${unfollowerName} `
    })
}
async function likeController(req,res)
{
    const {username}=req.user;
    const {postId}=req.params;
    const isPostAvalaible=await postModel.findById(postId);
    if(!isPostAvalaible)
    {
        return res.status(400).json({
            "shriji":"shriji post not available who does not get a blessing"
        })
    }
    const isUserPostCombinationExist=await likeModel.findOne({
        username:username,
        postId:postId 
    })
    if(isUserPostCombinationExist)
    {
        return res.status(400).json({
            shriji:"these post is liked already by shri ji"
        })
    }
    const likeByUser=await likeModel.create({
        user:username,
        post:postId
    })
    res.status(201).json({
        "shriji":"liked by user by shri ji"
    })
}
module.exports={
    followController,
    unfollowController,
    likeController
}