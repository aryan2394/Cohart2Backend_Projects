const mongoose=require("mongoose");
const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imageUrl:{
        type:String,
        required:[true,"image is required by shri ji"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
})
const postModel=mongoose.model("posts",postSchema);
module.exports=postModel;