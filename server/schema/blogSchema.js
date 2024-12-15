import mongoose from 'mongoose'

const blogSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required:true},
    postedOn: {type: Date, default: new Date().getTime(), required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, {Timestamp: true})

export default mongoose.model("Blog",blogSchema);