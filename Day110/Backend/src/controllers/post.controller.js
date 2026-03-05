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
async function feedController(req,res)
{
    // const allPosts=await postModel.find();
    // res.status ka matlab pata hai kya ki jab client side mein user likhta hai ki 
    // const response=api.get("/feed")
    // toh usko data wahi milega jo jab yaha se res.status mein bhejte hai isliye humara backend ka respnse takda  hona chahaiye
    // const allPosts=await postModel.find();
    // aap ye likhe toh aapko data mila ye har post ka lekin humein chahiye ki user ka poora detail chahiye user ki id nahi aur humein usko send kar karna hoga res.status ke throufgh taaki wo data use kar sakein 
    //  "_id": "69a22a800d19211c47e222e6",
    //         "caption": "shriji3",
    //         "imageUrl": "https://ik.imagekit.io/sbafdiwda/cohort-2-insta-clone-posts/Test_GrSnpvRDh",
    //         "user": "69a0e4dbb3e47b035aad0c17",
    //         "__v": 0
    const allPosts=await postModel.find().populate("user")
    // matlab jo pahle user mein sirf useriD AA RAHI THI AB WAHA PE poora useretails aa raha hai aur waji heum bhej denge 
    // taaki home page mein saare post mein jo user details bhi chahiye wo mil jaaye using populate 
    return res.status(200).json({
        "shriji":"all posts by shri ji",
        allPosts
    })
    //  "_id": "69a0e6791e464eaa5d7435d8",
    //         "caption": "shriji",
    //         "imageUrl": "https://ik.imagekit.io/sbafdiwda/cohort-2-insta-clone-posts/Test_UYpVXmkzR",
    //         "user": {
    //             "_id": "69a0c753027b12f28eb63ede",
    //             "username": "shriji4",
    //             "email": "shriji4@gmail.com",
    //             "password": "$2b$10$ot.k1QFRhq1lu/m46VO5VOfIxNikoIAViCqStAbAWbgSl2/iBcYny",
    //             "bio": "shriji",
    //             "imageUrl": "https://ik.imagekit.io/sbafdiwda/image?updatedAt=1770811642733",
    //             "__v": 0
    //         },
    //         "__v": 0
    // lekin AB SABSE BADA DIKKAT HO GAYA KI AAP POPULATE KAR DIYE TOH AB AAP USER KE PASSWORD BHI CLIENT KO SEND KAR RAHE HO AND SECURITY KE SABSE BADI CHEEZ YOU CAANOT
    // YOU CANNOT SEND THE PASSWORD IN FRONTEND ROH KYA KAREIN GO TO MODEL OF USER AND WAHA PE JAAKE PAASWORD KO SELECT :FALSE KAR DO MATLAB 
    // go to user.model.js
    // password:{
    //     type:String,
    //     required:[true,"password is required by shri ji"],
    //      select:false 
    // },
    // lekin ab aapka password databse mein save hoga lekin mongoose usko kabhi padh nahi payega and agar padh hai nahi payega toh 
    // user ko send bhi nahi kar payega 
    // lekin dikkat ab kya hoga ki aap jab login karte ho wah pe user ke password ko comapre kiya jaate hai kiske saath given paasword and humein toh user ka password 
    // toh hum raed hi nahi kar sakte toh how 
    
}
module.exports={
    createPostController,
    allPostByUserController,
    postDetailsController,
    feedController
}