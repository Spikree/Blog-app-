import express from "express"
import blogSchema from "../../schema/blogSchema.js";
import authenticateToken from "../../utils/jwtMiddleware.js";

const getSingleBlog = express.Router();

getSingleBlog.get('/:id', authenticateToken, async(req,res) => {
    const { id } = req.params;

    try {
        const blog = await blogSchema.findById(id);

        if(!blog) return res.status(404).json({message: "Blog not found"});

        return res.status(200).json({blog, message: "Blog fetched successfully"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Error fetching the blog"});
    }
});

export default getSingleBlog;