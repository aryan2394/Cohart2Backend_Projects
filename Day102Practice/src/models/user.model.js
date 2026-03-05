const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username should be unique"],
        required:[true,"username is required"]
    },
    email:{
        type:String,
        unique:[true,"email should be unique"],
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    bio:{
        type:String,
    },
    imageUrl:{
        type:String,
        default:"https://ik.imagekit.io/sbafdiwda/image?updatedAt=1770811642733"
    }
})
const userModel=mongoose.model("user",userSchema);
module.exports=userModel;