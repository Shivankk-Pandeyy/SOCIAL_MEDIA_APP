const mongoose=require('mongoose');
const Connect=async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/SOCIALMEDIA");
        console.log("MongoDb Connected");
    }
    catch(err){
        console.log(err);
    }
}
module.exports=Connect;