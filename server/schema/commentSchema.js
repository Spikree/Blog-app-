import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },
    comment: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
});

export default mongoose.model("Comment", commentSchema)