const userModel=require("../models/user.model.js");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
async function registerController(req,res)
{
    const {username,email,password,bio,imageUrl}=req.body;
    const isUserExist=await userModel.findOne({
        $or:[
            {
                username:username
            },
            {
                email:email
            }
        ]
    })
    if(isUserExist)
    {
        return res.status(409).json({
            "shriji":(isUserExist.email==email)?"email exists already by shri ji":"username exists already by shri ji"
        })
    }
    const hash=await bcrypt.hash(password,10);
    const user=await userModel.create({
        username,email,bio,imageUrl,
        password:hash
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
    res.status(200).json({
        "shriji":"shriji register successfully"
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
        return res.status(404).json({
            "shriji":"user not exists by shri ji"
        })
    }
    const checkPassword=await bcrypt.compare(password,user.password);
    if(!checkPassword)
    {
        return res.status(400).json({
            "shriji":"password to unlock shriji is wrong"
        })
    }
    const newtoken=jwt.sign(
        {
            id:user._id,
            username:user.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1d"
        }
    )
    res.cookie("token",newtoken);
    res.status(200).json({
        "shriji":"log in by shriji"
    })
}
module.exports={
    registerController,
    loginController
}