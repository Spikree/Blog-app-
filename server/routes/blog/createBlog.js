import express from 'express'
import Blog from "../../schema/blogSchema.js"
import authenticateToken from '../../utils/jwtMiddleware.js';

const createBlog = express.Router();

createBlog.post('/', authenticateToken,async (req,res) => {
    const {title, content} = req.body;
    const user = req.user

    if(!title || !content) {
        return res.status(400).json({message: "title and content are required"});
    }

    try {
        const newBlog = new Blog({
            title: title, 
            content: content,
            user: user.user._id
        })
    
        await newBlog.save();

        return res.status(200).json({
            message: "Blog uploaded sucessfully"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "internal server error"});
    }
})

export default createBlog;