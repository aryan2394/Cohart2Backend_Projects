const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs");
const postModel=require("../models/post.model.js");
const userModel=require("../models/user.model.js");
const jwt=require("jsonwebtoken");
const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})
async function createPostController(req,res)
{
    const {caption}=req.body;
     const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "cohort-2-insta-clone-posts"
    })
    const token=req.cookies.token;
    if(!token)
    {
        return res.status(401).json({
            "shriji":"unauthorized by shri ji"
        })
    }
    let payload=null;
    try {
        payload=await jwt.verify(token,process.env.JWT_SECRET);
    } catch (err) {
        return res.status(400).json({
            "shriji":"unauthorized by shri ji"
        })   
    }
    const userId=payload.id;
    const user=await userModel.findById(userId);
    const post=await postModel.create({
        caption:caption,
        imageUrl:file.url,
        user:user._id
    })
    res.status(201).json({
        "shriji":"post by shri ji"
    })
}
async function getAllPostByUserController(req,res)
{
    const token=req.cookies.token;
    if(!token)
    {
        return res.status(401).json({
            "shriji":"unauthorized user by shri ji"
        })
    }
    let payload=null;
    try {
        payload=jwt.verify(token,process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            "shriji":"unauthorized user by shri ji"
        })
    }
    const id=payload.id;
    const user=await userModel.findById(id);
    const allPostsByUser=await postModel.find({
        user:user._id
    })
    if(!allPostsByUser.length)
    {
        return res.status(404).json({
            "shriji":"no post found by shri ji"
        })
    }
    res.status(200).json({
        shriji:allPostsByUser
    })
}
async function getPostDetailsController(req,res)
{
     const token=req.cookies.token;
    if(!token)
    {
        return res.status(401).json({
            "shriji":"unauthorized user by shri ji"
        })
    }
    let payload=null;
    try {
        payload=jwt.verify(token,process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            "shriji":"unauthorized user by shri ji"
        })
    }
    const userId=payload.id;
    const {postId}=req.params;
    const post=await postModel.findById(postId);
    if(!post)
    {
        return res.status(404).json({
            "shriji":"post not found by shri ji"
        }) 
    }
    const user=await userModel.findById(userId);
    const legalUser=userId==post.user._id.toString();
    if(!legalUser)
    {
        return res.status(401).json({
            "shriji":"unauthorized user by shri ji"
        })
    }
    console.log(post,user,legalUser);
    res.status(200).json({
        user:user.username,
        email:user.email,
        postImage:post.imageUrl,
        caption:post.caption,
    })
}
module.exports={
    createPostController,
    getAllPostByUserController,
    getPostDetailsController,
}