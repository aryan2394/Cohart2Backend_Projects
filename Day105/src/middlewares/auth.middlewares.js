async function identifyUser(req,res,next)
{
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
        req.user=payload;
        // humne kya kiya hai ki req.user=pylaod
        // matlab jo user ki information hai wo paylaod mein and humein iss details ko send karna hai apne cotrollers mein 
        // therefore hum usko data ko send kar dete hai rqe.user mein save karke 
        next();
        // next:iska matlab hai ki hum ab apne hum flow to middleware se uss controllr par send kar rahe hai jiske beeche mein ye middleware use huwa hai 
        // agar next nahi karenege toh ye controller pe nahi jayega aur uss controller pe hum middleware ko use kar lenege as a middleare 
        
}
module.exports=identifyUser;