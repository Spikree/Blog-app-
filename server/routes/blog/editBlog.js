import express from "express"
import authenticateToken from "../../utils/jwtMiddleware.js";
import blogSchema from "../../schema/blogSchema.js";

const editBlog = express.Router();

editBlog.patch('/:id',authenticateToken, async(req,res) => {
    const {title, content} = req.body;
    const {id} = req.params;
    const user = req.user;

    try {
        const blog = await blogSchema.findById(id);

        if(!blog) {
            return res.status(400).json({
                message: "Blog not found"
            })
        }

        if (blog.user.toString() !== user.user._id.toString()) {
            return res.status(403).json({
                message: "Unauthorized to edit this blog"
            });
        }

        blog.title = title,
        blog.content = content

        await blog.save();

        return res.status(200).json({message: "Blog updated sucessfully"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "error editing the blog"})
    }
})

export default editBlog