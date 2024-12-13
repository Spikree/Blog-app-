import express from 'express'
import authenticateToken from '../../utils/jwtMiddleware.js'
import Blog from '../../schema/blogSchema.js'

const getAllBlogs = express.Router();

getAllBlogs.get('/',authenticateToken, async (req,res) => {
    
    try {
        const blogs = await Blog.find({});
        return res.status(200).json({
            message: "Blogs fetched sucessfully",
            blogs
        });
    } catch (error) {
        return res.status(400).json({
            message: "error fetching blogs"
        })
    }
});

export default getAllBlogs;