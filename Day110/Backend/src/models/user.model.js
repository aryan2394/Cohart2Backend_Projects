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
        required:[true,"password is required by shri ji"],
        select:false,
        // iska matlab hai ki mongoose kabhi bhi humare passowrd ko raead nahi kar payegi 
        // agar read hi nahi kar payegi toh user log in kaise hoga because waha pe toh the password get compared with passwod of the user 
        // and hueein kaise compare karenge toh forcefully login controller mein password read karo
    },
    bio:String,
    imageUrl:{
        type:String,
        default:"https://ik.imagekit.io/sbafdiwda/image?updatedAt=1770811642733"
    }
})
const userModel=mongoose.model("users",userSchema);
module.exports=userModel;