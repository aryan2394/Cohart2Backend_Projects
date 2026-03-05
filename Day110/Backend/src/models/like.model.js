const mongoose=require("mongoose");
const likeSchema=new mongoose.Schema({
    user:{
        type:String,
        required:[true,"user is required to like the post by shri ji"]
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts",
        required:[true,"post should exist by shri ji"]
    },
},{
    timestamps:true
})
likeSchema.index({user:1,post:1},{unique:true});
const likeModel=mongoose.model("likes",likeSchema);
module.exports=likeModel;