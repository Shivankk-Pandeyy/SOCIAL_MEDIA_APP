const mongoose=require('mongoose');
const postSchema=mongoose.Schema({
    userid:{
        type:String,
    },
    tweet:{
        type:String,
    },
    caption:{
        type:String,
    }
});
const Post=mongoose.model('Post',postSchema);
module.exports=Post;