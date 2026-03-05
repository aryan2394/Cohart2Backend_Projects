const userModel=require("../model/user.model.js");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
async function registerController(req,res)
{
    const {username,email,password,bio,imageUrl}=req.body;
    const isUserExist=await userModel.findOne({
        $or:[
            {
                email:email
            },
            {
                username:username
            }
        ]
    })
    if(isUserExist)
    {
        return res.status(409).json({
            "shri seva":(isUserExist.email==email)?"email exists by shri ji create new email by shri ji":"username exists by shri ji create new one by shir ji"
        })
    }
    const hash=await bcrypt.hash(password,10);
    const userShriji=await userModel.create({
        username,email,password:hash,bio,imageUrl
    })
    const token=jwt.sign(
        {
            id:userShriji._1,
            // make sure we store just the string username, not the whole user object
            username:userShriji.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1h"
        }
    )
    res.cookie("token",token);
    res.status(201).json({
        shriji:"user registered by shri ji",
        datashriji:userShriji,
        token:token
    })
}
async function loginController(req,res)
{
    const {username,email,password}=req.body;
    const user=await userModel.findOne({
        $or:[
            {
                username:username,
            },
            {
                email:email
            }
        ]
    })
    if(!user)
    {
        return res.status(404).json({
            "shrijikripa":"shri ji not found in anyone if she not give them blessing please register first"
        })
    }
    const checkPassword=await bcrypt.compare(password,user.password);
    if(!checkPassword)
    {
        return res.status(401).json({
            "humsab":"unauthorized hai shri ji ko paane ke liye buss unki kripa hai "
        })
    }
    const newtoken=jwt.sign(
        {
            id:user._id,
            // use the username from the found user document so it's defined even
            // when the client logged in with an email address only
            username:user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1d"
        }
    )
    res.cookie("token",newtoken);
    res.status(200).json({
        "shriji":"logged in me successfully",
        newtoken
    })
}
module.exports={
    registerController,
    loginController
}