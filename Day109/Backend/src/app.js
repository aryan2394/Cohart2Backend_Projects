const express=require("express");
const app=express();
const cors=require("cors");
app.use(cors({
    credentials:true,
    // matlab ki aap user creadentials ko bhi save karoge 
    origin:"http://localhost:5173"
    // save kaha pe karoge jab request aayegi 5173 se tab uss mein cookies mein store kar dena
}))

const authRouter=require("./routes/auth.route.js");
const postRouter=require("./routes/post.route.js");
const userRouter=require("./routes/user.route.js");
const cookieParser=require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRouter);
app.use("/api/posts",postRouter);
app.use("/api/users",userRouter);
module.exports=app;