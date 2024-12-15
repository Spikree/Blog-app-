import mongoose from "mongoose"

const likeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    }
}, {index: {
    unique: true,
    fields: ['user','blog']
}});

export default mongoose.model('Like', likeSchema);

