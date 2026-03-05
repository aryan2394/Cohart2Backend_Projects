const userModel=require("../models/user.model.js");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
async function registerController(req,res)
{
    const {username,email,password,bio,imageUrl}=req.body;
    const isUserExists=await userModel.findOne({
        $or:[
            {
                username,
            },
            {
                email
            }
        ]
    })
    if(isUserExists)
    {
        return res.status(404).json({
            "shriji":(isUserExists.email==email)?"email exists":"username exists"
        })
    }
    const hash=await bcrypt.hash(password,10);
    const user=await userModel.create({
        username,email,bio,imageUrl,password:hash
    })
    const token=jwt.sign(
        {
            id:user._id,
            username:user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1d"
        }
    )
    res.cookie("token",token);
    res.status(201).json({
        "shriji":"data saved by shri ji",
        "token":token
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
                email
            }
        ]
    })
    if(!user)
    {
        return res.status(401).json({
            "shriji":"not exist in someone by shri ji"
        })
    }
    const checkPassword=await bcrypt.compare(password,user.password);
    if(!checkPassword)
    {
        return res.status(404).json({
            "shriji":"password to unload shri ji is wrong"
        })
    }
    const newtoken=jwt.sign(
        {
            id:user._id,
            username:user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1d"
        }
    )
    res.cookie("token",newtoken);
    res.status(200).json({
        "message":"shri ji login ",
        "token":newtoken
    })
}
module.exports={
    registerController,
    loginController
}