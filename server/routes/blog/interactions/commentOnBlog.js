import express from "express"
import authenticateToken from "../../../utils/jwtMiddleware.js";
import blogSchema from "../../../schema/blogSchema.js";
import Comment from "../../../schema/commentSchema.js"

const commentOnBlog = express.Router();

commentOnBlog.post("/:id", authenticateToken, async(req,res) => {
    const blogId = req.params.id;
    const {text}= req.body
    const user = req.user
    const userId = user.user._id;

    try {
        if(!text || text.trim().length === 0) {
            return res.status(400).json({message: "comment cannot be empty"});
        }
    
        const blog = await blogSchema.findById(blogId);
    
        if(!blog) {
            return res.status(400).json({message: "Blog not found"})
        }
    
        const newComment = new Comment({
            user: userId,
            blog: blogId,
            comment: text
        })
    
        await newComment.save();

        res.status(201).json({
            message: 'Comment added successfully',
            comment: newComment
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message,
        });
    }
});

commentOnBlog.get('/:id',authenticateToken, async (req, res) => {
    const blogId  = req.params.id;
    try {
        const blog = await blogSchema.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        const comments = await Comment.find({ blog: blogId }).sort({ createdAt: -1 }); 

        res.status(200).json(comments);

    } catch (error) {
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
});

export default commentOnBlog;