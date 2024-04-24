const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const app = express()
const MONGO_URL = `${process.env.MONOGODB_URL}/demo`
  
  app.use(cors());
app.use(express.json())
mongoose.connect(MONGO_URL);
const db = mongoose.connection
db.on('error',(err)=>{
    console.log("MongoDB Error");
})
db.once('open',()=>{
    console.log("Mongoose is Connected");
})
const userScheme = new mongoose.Schema({
    name : String,
    email : String,
    message : String,
});
const User= mongoose.model('User',userScheme);
app.post("/register", async (req,res)=>{
    try{
        const newUser = new User({
            name : req.body.name,
            email : req.body.email,
            message : req.body.message,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)        
        }catch(error){
            console.error('Error while registering the user',error);
          res.status(500).json({error:"Server Error"})
        }
    
});

app.get("/",(req,res)=>{
    res.send("Hello World")
})



app.listen(PORT)