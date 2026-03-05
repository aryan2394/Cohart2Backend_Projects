const ImageKit = require("@imagekit/nodejs/index.js")
const { toFile } = require("@imagekit/nodejs/index.js");
const jwt=require("jsonwebtoken");
const postModel=require("../models/post.model.js");
const userModel=require("../models/user.model.js");
const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})
async function createPostController(req,res)
{
     const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "cohort-2-insta-clone-posts"
    })
    const userId=req.user.id;
    const imageUrl=file.url;
    const {caption}=req.body;
    const post=await postModel.create({
        caption:caption,
        imageUrl:imageUrl,
        user:userId
    })
    res.status(201).json({
        "shriji":"shriji post created "
    })
}
async function allPostByUserController(req,res)
{
    const userId=req.user.id;
    const allPosts=await postModel.find({
        user:userId
    })
    if(!allPosts)
    {
        return res.status(404).json({
            "shriji":"no post avalaible by shri ji"
        })
    }
    res.status(200).json({
        "shriji":allPosts
    })
}
async function postDetailsController(req,res)
{
    const {token}=req.cookies;
    const userId=req.user.id;
    const {postId}=req.params;
    const post=await postModel.findById(postId);
    if(!post)
    {
        return res.status(404).json({
            "shriji":"post is not available by shri ji"
        })
    }
    const user=await userModel.findById(userId);
    res.status(200).json({
        "shriji":"post details by shri ji",
        "post":{
            caption:post.caption,
            user:user.username,
            imageUrl:post.imageUrl
        }
    })
}
module.exports={
    createPostController,
    allPostByUserController,
    postDetailsController
}