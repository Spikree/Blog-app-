import mongoose from 'mongoose'

const blogSchema = mongoose.Schema({
    title: {type: String},
    content: {type: String},
    postedOn: {type: Date, default: new Date().getTime()}
})

export default mongoose.model("Blog",blogSchema);