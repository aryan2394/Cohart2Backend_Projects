const moongoose=require("mongoose");
async function connectToDb()
{
    try {
        await moongoose.connect(process.env.MONGO_URI);
        console.log("database is connected by shri ji");

    } catch (error) {
        console.log("error is",error);
    }
}
module.exports=connectToDb;