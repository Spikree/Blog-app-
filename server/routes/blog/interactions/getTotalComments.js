import express from "express"
import authenticateToken from "../../../utils/jwtMiddleware.js";
import blogSchema from "../../../schema/blogSchema.js";
import Comment from '../../../schema/commentSchema.js'

const getTotalComments = express.Router();

getTotalComments.get('/:id', authenticateToken, async (req,res) => {
    const  blogId  = req.params.id;

    try {
        const blog = await blogSchema.findById(blogId);
        if(!blog) return res.status(400).json({message: "Blog not found"});

        const totalComments = await Comment.countDocuments({blog: blogId});

        res.status(200).json({totalComments})
    } catch (error) {
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
})

export default getTotalComments