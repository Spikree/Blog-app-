import express from 'express'
import authenticateToken from '../../utils/jwtMiddleware.js'
import Blog from '../../schema/blogSchema.js'
import likeSchema from '../../schema/likeSchema.js';

const getAllBlogs = express.Router();

getAllBlogs.get('/', authenticateToken, async (req, res) => {
    const user = req.user;
    const userId = user.user._id;
    
    try {
        // Fetch all blogs sorted by creation date
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        
        // Fetch all likes for the current user for these blogs
        const userLikes = await likeSchema.find({
            user: userId,
            blog: { $in: blogs.map(blog => blog._id) }
        });
        
        // Create a Set of liked blog IDs for efficient lookup
        const likedBlogIds = new Set(userLikes.map(like => like.blog.toString()));
        
        // Map over blogs to add hasLiked property
        const blogsWithLikeStatus = blogs.map(blog => {
            const blogObj = blog.toObject();
            return {
                ...blogObj,
                hasLiked: likedBlogIds.has(blog._id.toString())
            };
        });
        
        return res.status(200).json({
            message: "Blogs fetched successfully",
            blogs: blogsWithLikeStatus
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return res.status(400).json({
            message: "Error fetching blogs",
            error: error.message
        });
    }
});

export default getAllBlogs;