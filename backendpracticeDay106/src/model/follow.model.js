const mongoose=require("mongoose");
const followSchema=new mongoose.Schema({
    follower:{
        type:String,
        required:[true,"follower required by shri ji"],
    },
    followee:{
        type:String,
        required:[true,"followee is required by shri ji"]
    },
    status:{
        type:String,
        default:"pending",
        enum:{
            values:["pending","accepted","rejected"],
            message:"value can be accepted,pending,rejected by shri ji"
        }
    }
},{
    timestamps:true
})
followSchema.index({follower:1,followee:1},{unique:true});
const followModel=mongoose.model("follows",followSchema);
module.exports=followModel;