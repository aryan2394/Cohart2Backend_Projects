const jwt=require("jsonwebtoken");
async function verifyUser(req,res,next)
{
    const {token}=req.cookies;
    if(!token)
    {
        return res.status(401).json({
            "shriji":"token is not there please login again or register by shri ji"
        })
    }
    let payload=null;
    try{
        payload=await jwt.verify(token,process.env.JWT_SECRET);
        }
    catch(err){
        return res.status(409).json({
            "shriji":"unauthorized user by shri ji"
        })
    }
    req.user=payload;
    next();
}
module.exports=verifyUser;