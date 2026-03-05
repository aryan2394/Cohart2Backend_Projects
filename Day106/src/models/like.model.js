const mongoose=require("mongoose");
const likeSchema=new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts",
        required:[true,"post sholud be available"]
    },
    user:{
        type:String,
        // isko string kyon because hum kis post ko kaun se username ne like kiya hai wo store karenege 
        // matlab username n ki username ki _id
        required:[true,"user sholud required to like"]
    }
},{
    timestamps:true
})
likeSchema.index({post:1 ,user:1},{unique:true});
const likeModel=mongoose.model("likes",likeSchema);
module.exports=likeModel;