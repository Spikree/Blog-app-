import express from 'express'
import authenticateToken from '../../utils/jwtMiddleware.js'
import Blog from '../../schema/blogSchema.js'
import likeSchema from '../../schema/likeSchema.js';

const getUserBlogs = express.Router();

getUserBlogs.get('/', authenticateToken, async(req,res) => {
    const user = req.user;

    try {
        // Fetch all blogs for the current user
        const blogs = await Blog.find({user: user.user._id});

        // Fetch all likes by the current user on their blogs
        const userLikes = await likeSchema.find({
            user: user.user._id,
            blog: { $in: blogs.map(blog => blog._id) }
        });

        // Create a Set of liked blog IDs for efficient lookup
        const likedBlogs = new Set(userLikes.map(like => like.blog.toString()));

        // Get total likes for each blog
        const likeCounts = await Promise.all(
            blogs.map(blog => 
                likeSchema.countDocuments({ blog: blog._id })
            )
        );

        // Map over blogs to add hasLiked property and totalLikes
        const blogsWithLikeStatus = blogs.map((blog, index) => {
            const blogObj = blog.toObject();
            return {
                ...blogObj,
                hasLiked: likedBlogs.has(blog._id.toString()),
                totalLikes: likeCounts[index]
            };
        });

        return res.status(200).json({
            blogs: blogsWithLikeStatus,
            message: "Retrieved all blogs successfully"
        });
    } catch (error) {
        console.error('Error fetching blogs:', error); // Changed to console.error for errors
        return res.status(400).json({
            message: "Error fetching your blogs",
            error: error.message
        });
    }
});

export default getUserBlogs;