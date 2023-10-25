const mongoose=require('mongoose');
const messageSchema=mongoose.Schema({
    rid:{
        type:String,
    },
    sid:{
        type:String,
    },
    message:{
        type:String,
    }
});
const Message=mongoose.model('Message',messageSchema);
module.exports=Message;