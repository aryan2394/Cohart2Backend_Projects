const mongoose=require("mongoose");
const likeSchema=new mongoose.Schema({
    postUrl:{
        type:String,
        required:[true,"post is required to like"]
    },
    user:{
        type:String,
        required:[true,"user is required"]
    },
},{
    timestamps:true
})
likeSchema.index({postUrl:1,user:1},{unique:true});
const likeModel=mongoose.model("likes",likeSchema);
module.exports=likeModel;