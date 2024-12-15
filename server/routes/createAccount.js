import User from "../schema/userSchema.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createAccount = express.Router();

createAccount.post("/" , async (req,res) => {
    const {userName, email, password} = req.body;

    if(!userName || !email || !password) {
        return res.status(400).json({message: "All the fields are required"});
    }

    const isUser = await User.findOne({email: email});
    const isUserNameTaken = await User.findOne({userName: userName});

    if(isUser) {
        return res.status(400).json({message: "A user with this email is already present"});
    }

    if(isUserNameTaken) {
        return res.status(400).json({message: "username taken please use a different username"});
    }

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const user = new User({
        userName : userName,
        email : email,
        password : hashedPassword
    });

    await user.save();

    const accessToken = jwt.sign({
        user
    },process.env.ACCESS_TOKEN_SECRET , {
        expiresIn: "36000m"
    })

    return res.json({
        email: user.email,
        accessToken,
        message : "account created sucessfully"
    })
});

export default createAccount;