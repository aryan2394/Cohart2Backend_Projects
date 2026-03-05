const jwt=require("jsonwebtoken");
async function identifyUser(req,res,next)
{
    const {token}=req.cookies;
        let payload=null;
        try {
            payload=jwt.verify(token,process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({
                "shriji":"unauthorized to shri ji either token expired or user not exist"
            })
        }
        req.user=payload;
        next();
}
module.exports=identifyUser;