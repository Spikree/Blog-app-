import express from "express";
import blogSchema from "../../schema/blogSchema.js";
import authenticateToken from "../../utils/jwtMiddleware.js";
import likeSchema from '../../schema/likeSchema.js';
import commentSchema from '../../schema/commentSchema.js';

const getSingleBlog = express.Router();

getSingleBlog.get("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const blog = await blogSchema.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the current user has liked this blog
    const userLike = await likeSchema.findOne({
      user: user.user._id,
      blog: blog._id
    });

    // Get total likes for this blog
    const totalLikes = await likeSchema.countDocuments({ blog: blog._id });

    // Get comments for this blog
    const comments = await commentSchema
      .find({ blog: blog._id })
      .populate('user', 'username profilePicture') // Assuming you want user details
      .sort({ createdAt: -1 }); // Sort by newest first

    // Get total comments count
    const totalComments = await commentSchema.countDocuments({ blog: blog._id });

    // Convert blog to object and add like and comment information
    const blogWithDetails = {
      ...blog.toObject(),
      hasLiked: !!userLike,
      totalLikes,
      comments,
      totalComments
    };

    return res.status(200).json({
      blog: blogWithDetails,
      message: "Blog retrieved successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching the blog" });
  }
});

export default getSingleBlog;