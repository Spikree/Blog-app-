import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {type: String},
    email: {type: String},
    password: {type: String},
});

export default mongoose.model("User", userSchema);