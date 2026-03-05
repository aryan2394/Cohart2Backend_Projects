const mongoose=require("mongoose");
const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imageUrl:{
        type:String,
        required:[true,"image is required of shri ji"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"shri ji required to create post"]
    },
})
const postModel=mongoose.model("posts",postSchema);
module.exports=postModel;