import express from 'express'
import authenticateToken from '../../utils/jwtMiddleware.js'
import Blog from '../../schema/blogSchema.js'

const getUserBlogs = express.Router();

getUserBlogs.get('/', authenticateToken, async(req,res) => {
    const user = req.user;

    try {
        const blogs = await Blog.find({user: user.user._id});

        return res.status(200).json({
            blogs,
            message: "retrived all blogs sucessfully"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "error fetching your blogs"})

    }
})

export default getUserBlogs