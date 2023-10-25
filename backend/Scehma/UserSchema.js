const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        maximum:100,
    },
    number:{
        type:String,
        required:true,
        maximum:15,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
});
const User=mongoose.model('User',userSchema);
module.exports=User;