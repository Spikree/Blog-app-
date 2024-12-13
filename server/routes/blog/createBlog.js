import express from 'express'
import Blog from "../../schema/blogSchema.js"

const createBlog = async (req, res) => {
    const {title, content} = req.body;

    if(!title || !content) {
        return res.status(400).json({message: "title and content are required"});
    }

    try {
        const newBlog = new Blog({
            title: title, 
            content: content
        })
    
        await newBlog.save();

        return res.status(200).json({
            message: "Blog uploaded sucessfully"
        })
        
    } catch (error) {
        return res.status(400).json({message: "internal server error"});
    }
}

export default createBlog;