import express from 'express'
import authenticateToken from '../../utils/jwtMiddleware.js'
import Blog from '../../schema/blogSchema.js'
import likeSchema from '../../schema/likeSchema.js';

const getUserBlogs = express.Router();

getUserBlogs.get('/', authenticateToken, async(req,res) => {
    const user = req.user;

    try {
        const blogs = await Blog.find({user: user.user._id});

        const userLikes = await likeSchema.find({
            user: user.user._id,
            blog: { $in: blogs.map(blog => blog._id) }  // Changed 'Blog' to 'blog'
        });

        const likedBlogs = new Set(userLikes.map(like => like.blog.toString()));

        const blogsWithLikeStatus = blogs.map(blog => {
            const blogObj = blog.toObject();
            return {
                ...blogObj,
                hasLiked: likedBlogs.has(blog._id.toString())
            };
        });

        return res.status(200).json({
            blogs: blogsWithLikeStatus,  // Changed key name for consistency
            message: "Retrieved all blogs successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Error fetching your blogs"});
    }
});

export default getUserBlogs;