const mongoose = require('mongoose');
const followSchema=new mongoose.Schema({
    follower:{
        type:String,
        required:[true,"follower should be required"]
    },
    followee:{
        type:String,
        required:[true,"followee is required"]
    },
    
},{
    timestamps:true
})
followSchema.index({follower:1 ,followee:1},{unique:true})
// Ye MongoDB ko bol raha hai ki follower + followee ka combination UNIQUE hona chahiye.
// Ek hi follower kisi same followee ko sirf ek baar follow kar sakta hai.
const followModel=mongoose.model("follows",followSchema);
module.exports=followModel;