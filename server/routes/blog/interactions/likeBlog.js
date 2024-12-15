import express from "express"
import Blog from "../../../schema/blogSchema.js"
import authenticateToken from "../../../utils/jwtMiddleware.js";
import Like from "../../../schema/likeSchema.js"

const likeBlog = express.Router();

likeBlog.put('/:id',authenticateToken,async(req,res) => {
    const user = req.user
    const userId = user.user._id;
    const  blogId  = req.params.id;

    try {
        const blog = await Blog.findById(blogId);

        console.log(blog)

        if(!blog) {
            return res.status(400).json({message: "Blog not found"})
        }

        const existingLike = await Like.findOne({
            user: userId,
            blog: blogId
        })

        if(existingLike) {
            await Like.findByIdAndDelete(existingLike._id);
            return res.status(200).json({message: "Blog unliked", liked: false})
        }

        const newLike = new Like({
            user: userId,
            blog: blogId
        })

        await newLike.save();

        const totalLikes = await Like.countDocuments({blog: blogId});

        return res.status(200).json({
            message: "Blog liked",
            liked: true,
            totalLikes
        })

    } catch (error) {
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        }); 
    }
})

export default likeBlog;