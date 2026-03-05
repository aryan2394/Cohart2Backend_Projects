const mongoose=require("mongoose");
const followSchema=new mongoose.Schema({
    follower:{
        type:String,
        required:[true,"follower should be required by shri ji"]
    },
    followee:{
       type:String,
        required:[true,"followee sholud be required by shri ji"]
    },
    status:{
        type:String,
        default:"pending",
        enum:{
            values:["pending","accepted","rejected"],
            message:"status can only by pending,rejected or accepted by shri ji"
        }
    }
},{
    timestamps:true
})
followSchema.index({follower:1 ,followee:1},{unique:true});
const followModel=mongoose.model("follow",followSchema);
module.exports=followModel;