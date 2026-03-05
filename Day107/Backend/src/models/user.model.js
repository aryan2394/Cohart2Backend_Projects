const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username should be required by shri ji"],
        required:[true,"username is required by shri ji"]
    },
    email:{
        type:String,
        unique:[true,"email should be required by shri ji"],
        required:[true,"email is required by shri ji"]
    },
    password:{
        type:String,
        required:[true,"password is required by shri ji"]
    },
    bio:String,
    imageUrl:{
        type:String,
        default:"https://ik.imagekit.io/sbafdiwda/image?updatedAt=1770811642733"
    }
})
const userModel=mongoose.model("users",userSchema);
module.exports=userModel;