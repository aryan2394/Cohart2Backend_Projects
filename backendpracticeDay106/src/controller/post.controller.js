const ImageKit = require("@imagekit/nodejs/index.js")
const { toFile } = require("@imagekit/nodejs/index.js");
const postModel=require("../model/post.model.js");
const userModel=require("../model/user.model.js");
const jwt=require("jsonwebtoken");
const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})
async function createPostController(req,res)
{
    const {caption}=req.body;
    const payload=req.user;
    console.log(payload);
    const user=await userModel.findById(payload.id);
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "cohort-2-insta-clone-posts"
    })
    const post=await postModel.create({
        user:user._id,
        caption:caption,
        imageUrl:file.url
    })
    res.status(201).json({
        "shrijipost":"post created successfully",
        post
    })
}
async function allPostByUserController(req,res)
{
    const payload=req.user;
    console.log(payload);
    const allPosts=await postModel.find({
        user:payload.id
    })
    if(allPosts.length==0)
    {
        return res.status(200).json({
            "shrijipics":"no post of shriji by you"
        })
    }
    res.status(200).json({
        "shrijiallpics":allPosts
    })
}
async function postDetailsController(req,res)
{
    const payload=req.user;
    const {postId}=req.params;
    const post=await postModel.findById(postId);
    if(!post)
    {
        return res.status(404).json({
            "shriji":"post not available of shriji"
        })
    }
    const validUser=post.user.toString()==payload.id;
    const user=await userModel.findById(payload.id)
    if(!validUser)
    {
        return res.status(409).json({
            "shriji":"unauthorized access to shri ji"
        })
    }
    console.log(post,payload);
    res.status(200).json({
        "shrijipost":{
            user:user.username,
            caption:post.caption,
            image:post.imageUrl,
        }
    })
}
module.exports={
    createPostController,
    allPostByUserController,
    postDetailsController
}