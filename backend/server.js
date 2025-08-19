import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv, { config } from "dotenv";
import bcrypt from "bcrypt";
import say from "say";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/hackathon_db').then(()=>console.log('Connected to Database!!!')).catch((err)=> console.log('DB Error', err));
//model
const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String
}, {timestamps : true});
const User = mongoose.model('User', userSchema);
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log('Server Started!!!');
});
// registration
app.post('/register', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    if (name && email && password && confirm_password){
        if (password != confirm_password){
            return res.send({"status":"failed", "message" : "Password & Confirm Password doesn't match!!!"});
        };
        const user = await User.find({email : email});
        if(user.length > 0){
            return res.send({"status": "failed", "message": "Email already exits"});
        } else{
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);
            const lower_name = name.toLowerCase();
            const lower_email = email.toLowerCase();
            const newUser = new User({
                name : lower_name,
                email : lower_email,
                password : hashed
            });
            newUser.save();
            return res.send({"status": "success", "message": "User created successfully"});
        };
    }else{
        console.log('All the Fields are required!!!');
        return res.send({"status": "failed", "message": "Please fill out all fields"});
    }
});


// login
app.post("/login", async (req, res)=>{
    const {email, password} = req.body;
    if(email && password){
        const lower_email = email.toLowerCase();
        const user = await User.find({email : lower_email});
        if (user.length > 0){
            console.log('hahahaha exits')
        } else{
            return res.send({"status": "failed", "message": "Invalid email or password ❌"});
        };
        say.speak("Welcome Sameer","Microsoft Zira Desktop")
        return res.send({"status": "success", "message": "Login successful ✅"});
    } else{
        return res.send({"status": "failed", "message": "All fields are required❗"});
    };
});