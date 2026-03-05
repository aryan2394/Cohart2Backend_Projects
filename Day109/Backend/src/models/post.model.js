const mongoose=require("mongoose");
const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:"",
    },
    imageUrl:{
        type:String,
        required:[true,"image is required by shriji"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"user required to craete post by shri ji"]
    }
})
const postModel=mongoose.model("posts",postSchema);
module.exports=postModel;
