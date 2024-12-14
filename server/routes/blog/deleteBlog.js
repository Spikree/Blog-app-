import express from "express"
import blogSchema from "../../schema/blogSchema.js";

const deleteBlog = express.Router();

deleteBlog.delete('/:id', async(req,res) => {
    const {id} = req.params;

    try {
        const blog = await blogSchema.findByIdAndDelete(id);
        if(!blog) return res.status(400).json({message: "Blog not found"});
        return res.status(200).json({message:"Blog deleted sucessfully"});
    } catch (error) {
        return res.status(400).json({message: "error deleting blog"});
    }
});

export default deleteBlog;