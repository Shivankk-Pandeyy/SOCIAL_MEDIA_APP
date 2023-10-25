const express=require('express');
const app=express();
const cors=require('cors');
const dotenv=require('dotenv').config();
const port=process.env.PORT;
const BASE_URL=process.env.BASE_URL;
//MONGODB 
const Connection=require('./Connection/Connection');
Connection();
//USERSCHEMA
const User=require('./Scehma/UserSchema');
//REQUEST SCHEMA
const Request=require('./Scehma/RequestSchema');
//FRIEND SCHEMA
const Friend=require('./Scehma/FriendSchema');
//MESSAGE SCHEMA
const Message=require('./Scehma/MessageSchema');
//POST SCHEMA
const Post=require('./Scehma/PostSchema');
//MIDDLEWARE
app.use(cors());
app.use(express.json());
//RESTFULL APIs
//SIGNUP
app.post('/Signup',async(req,res)=>{
    const {name,number,username,password}=req.body;
    const dummy=await User.findOne({username});
    if(dummy){
        return res.status(400).json({message:"USERNAME TAKEN"})
    }
    else{
        const user=await new User({
        name,
        number,
        username,
        password,
    })
    await user.save();
    res.status(200).json({message:"SIGNUP SUCCESFULL"})
    }
})
//LOGIN
app.post('/Login',async(req,res)=>{
    const {username,password}=req.body;
    const e=await User.findOne({username});
    const p=await User.findOne({password});
    if(!e){
        return res.status(400).json({message:"INVALID USERNAME"});
    }
    else if(!p){
        return res.status(400).json({message:"INVALID PASSWORD"})
    }
    else if(!p && ! e){
        return res.status(400).json({message:"INVALID CREDENTIALS"})
    }
   else{
        return res.status(200).json({message:"LOGIN SUCCESFULL"})
   }
})
//GET ALL USERS
app.get('/userlist',async(req,res)=>{
    try{
        const user=await User.find({});
        res.json(user);
    }
    catch(err){ 
        console.log("ERROR");
    }
})
//REQUEST
//SEND REQ
app.post('/Request',async(req,res)=>{
    const {rid,sid,sname}=req.body;
    console.log(req.body)
    const ri=await Request.findOne({rid});
    if(ri===null){

    }
    else if((ri.rid===rid && ri.sid===sid) || (ri.rid===sid && ri.sid===rid)){
        return res.status(400).json({message:"ALL SENT"})
    }
    
        try{
            const request=await new Request({
                rid,
                sid,
                sname,
            })
            await request.save();
            return res.status(200).json({message:"REQUEST SENT"})
        }
        catch(err){
            console.log("ERROR");
        }
    
})
//RECV REQUEST
app.get('/requestlist',async(req,res)=>{
    try{
        const request=await Request.find({});
        res.json(request);
    }
    catch(err){ 
        console.log("ERROR");
    }
})
//DELETE REQUEST
app.delete('/reqdelete/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        await Request.findByIdAndDelete({
            _id:id
        })
        res.status(200).json({message:"DELETED"})
    }
    catch(err){
        console.log(err);
    }
})
//FRIEND ACCEPT
app.post('/Friend',async(req,res)=>{
    const {rid,rname,sid,sname}=req.body;

    const ri=await Request.findOne({rid,sid});

        try{
            const friend=await new Friend({
                rid,
                rname,
                sid,
                sname,
            })
            await friend.save();
            return res.status(200).json({message:"ACCEPTED"})
        }
        catch(err){
            console.log("ERROR");
        }
    
})
//FRIEND LIST
app.get('/friendlist',async(req,res)=>{
    try{
        const friend=await Friend.find({});
        res.json(friend);
    }
    catch(err){ 
        console.log("ERROR");
    }
})
//DELETE FRIEND
app.delete('/frdelete/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        await Friend.findByIdAndDelete({
            _id:id
        })
        res.status(200).json({message:"DELETED"})
    }
    catch(err){
        console.log(err);
    }
})
//UPDATE USER INFORMATION
app.put('/UpdateUser/:id',async(req,res)=>{
    const {id}=req.params
    const {name,number,username}=req.body;
    const mail=await User.findOne({username:username});
    if(mail){
        res.status(400).json({message:"username exists"})
    }
    try{ 
    const user=await User.findByIdAndUpdate({_id:id},{name,number,username});
    await user.save();
    res.status(200).json("Updated");
    }
    catch(err){
        console.log({err:err.message});
    }
})
//MESSAGE APIs
//POST MESSAGE
app.post('/Messages',async(req,res)=>{
    const {rid,sid,message}=req.body;
    const msg=await new Message({
        rid,
        sid,
        message,
    });
    await msg.save();
    return res.status(200).json({message:"MSG REACHED"})
})
//GET MSG
app.get('/msglist',async(req,res)=>{
    try{
        const friend=await Message.find({});
        res.json(friend);
    }
    catch(err){ 
        console.log("ERROR");
    }
})
//DLT MESSAGE
app.delete('/messagedelete/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        await Message.findByIdAndDelete({
            _id:id
        })
        res.status(200).json({message:"DELETED"})
    }
    catch(err){
        console.log(err);
    }
})
//POSTING TWEETS
app.post('/Tweet',async(req,res)=>{
    const {userid,tweet,caption}=req.body;
    const msg=await new Post({
        userid,
        tweet,
        caption,
    });
    await msg.save();
    return res.status(200).json({message:"POSTED"})
})
//GETTING TWEETS
app.get('/tweetlist',async(req,res)=>{
    try{
        const friend=await Post.find({});
        res.json(friend);
    }
    catch(err){ 
        console.log("ERROR");
    }
})
//DELETING TWEETS
app.delete('/tweetdelete/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        await Post.findByIdAndDelete({
            _id:id
        })
        res.status(200).json({message:"DELETED"})
    }
    catch(err){
        console.log(err);
    }
})
//Server Start
app.listen(port,()=>{
    console.log(`Server Running At ${port}`);
})