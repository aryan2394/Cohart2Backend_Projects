const ImageKit = require("@imagekit/nodejs/index.js")
const { toFile } = require("@imagekit/nodejs/index.js")
const jwt=require("jsonwebtoken");
const postModel=require("../models/post.model.js")
const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})
async function createPostController(req,res)
{
    // can able to create post if authorized and all thing goes well
    // console.log(req.body,req.file);
    const {caption}=req.body;
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "cohort-2-insta-clone-posts"
    })
    const token=req.cookies.token;
    if(!token)
    {
        // agar aisa ho token exists hi nahi karta jaise 
        // user post create karna chahata hai lekin account n ho 
        // ya phir account ho lkein token exired ho gaya hai toh login karega wo then new token mil jayega and craete post
        return res.status(401).json({
            "shri ji":"unauthorized user either token expired or unregisted by shri ji"
        })
    }
    // aisa ho ki token toh ho lekin wo valin n ho jaise kisi aur server ya hacker ne token create kar diya ho then dikkat ho skati hai lekin
    // jwt.verify usko check kar lega lekin error aayega then app crash 
    let payload=null;
    try {
        payload=jwt.verify(token,process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({
            shriji:"unauthorized by shri ji"
        })
    }
    const post=await postModel.create({
        caption:caption,
        imageUrl:file.url,
        user:payload.id
    })
    res.status(201).json({
        "shrijipost":"psot by shri ji",
        "psotshriji":post
    })
}
async function getAllPostByUserController(req,res)
{
    const token=req.cookies.token;
    // ek particaular user agar chahe ki wo kaun kaun se post craete kiya hai saare dekhna chahat hai then 
    if(!token)
    {
        return res.status("no token by shri ji")
    }
    let payload=null;
    try{
        payload=await jwt.verify(token,process.env.JWT_SECRET);
    }
    catch(err)
    {
        return res.status(401).json({
            "shriji":"unauthorized access"
        })
    }
    const id=payload.id;
    const allPosts=await postModel.find({
        user:id
    })
    res.status(200).json({
        "allposts":"shri ji",
        allPosts
    })
}
async function getPostDetails(req,res)
{
    const token=req.cookies.token;
    if(!token)
    {
        return res.status(401).json({
            "messagebyshriji":"unauthorized byy shri ji"
        })
    }
    let payload=null;
    try {
        payload=jwt.verify(token,process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            "shriji":"invalid token and unauthorized",
        })
    }
    const id=payload.id;
    const {postId}=req.params;
    const post=await postModel.findById(postId);
    if(!post)
    {
        // post hi delete ho gaya hai then
        return res.status(403).json({
            shriji:"no post available"
        })
    }
    const checkUser=id.equals(post.user);
    if(!checkUser)
    {
        return res.status(403).json({
            shriji:"dusra user hai by shri ji"
        })
    }
    res.status(200).json({
        shriji:"feteched by shri ji",
        post 
    })
}
module.exports={
    createPostController,
    getAllPostByUserController,
    getPostDetails
}