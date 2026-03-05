const userModel=require("../models/user.model.js");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
async function registerController(req,res)
{
    const {username,email,password,bio,profilePic}=req.body;
    const isUserExists=await userModel.findOne({
        $or:[
            {
                username
            },
            {
                email
            }
        ]
    })
    if(isUserExists)
    {
        return res.status(200).json({
            "message":(isUserExists.email==email)?"same email shri ji exists":"same username shri ji exists"
        })
    }
    const hash=await bcrypt.hash(password,10);
    const user=await userModel.create({
        username,email,password:hash,bio,profilePic
    })
    const token=jwt.sign(
        {
            id:user._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1d"
        }
    )
    res.cookie("token",token);
    res.status(201).json({
        "message":"user created by shri ji",
        "usershriji":user
    })
}
async function loginController(req,res)
{
    const {username,email,password}=req.body;
    const user=await userModel.findOne({
        $or:[
            {
                username:username
            },
            {
                email:email
            }
        ]
    })
    if(!user)
    {
        return res.status(409).json({
            "shri ji":"register shri ji first to login"
        })
    }
    const passwordCheck=await bcrypt.compare(password,user.password);
    if(!passwordCheck)
    {
        return res.status(400).json({
            "shri ji":"password is wrong",
        })
    }
    const newtoken=jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    res.cookie("token",newtoken);
    res.status(200).json({
        "shri ji":"user logged in shri ji",
        "datashriji":user
    })
}
module.exports={
    registerController,
    loginController,
}