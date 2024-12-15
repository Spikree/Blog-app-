import express from "express";
import User from "../schema/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const login = express.Router();

login.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const isUser = await User.findOne({ email: email });

  if (!isUser) {
    return res.status(400).json({ message: "User not found" });
  }

  try {
    if (isUser.email == email && await bcrypt.compare(password, isUser.password)) {
      const user = { user : isUser };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
      });

      return res.status(200).json({
        message: "login sucessful",
        email,
        accessToken,
      });
    } else {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    return res.status(401).json({ message: "Internal server error" });
  }
});

export default login;
