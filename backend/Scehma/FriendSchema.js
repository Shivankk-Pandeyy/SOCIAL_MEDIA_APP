const mongoose=require('mongoose');
const friendSchema=mongoose.Schema({
    rid:{
        type:String,
    },
    rname:{
        type:String,
    },
    sid:{
        type:String,
    },
    sname:{
        type:String,
    }
});
const Friend=mongoose.model('Friend',friendSchema);
module.exports=Friend;