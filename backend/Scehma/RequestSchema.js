const mongoose=require('mongoose');
const requestSchema=mongoose.Schema({
    rid:{
        type:String,
    },
    sid:{
        type:String,
    },
    sname:{
        type:String,
    }
});
const Request=mongoose.model('Request',requestSchema);
module.exports=Request;