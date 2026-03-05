const mongoose=require("mongoose");
async function connectToDb()
{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database is connected by shri ji");
    } catch (error) {
        console.log("error is ",error);
    }
}
module.exports=connectToDb;