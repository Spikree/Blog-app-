import express from "express";
import authenticateToken from "../../utils/jwtMiddleware.js";
import blogSchema from "../../schema/blogSchema.js";

const searchBlog = express.Router();

searchBlog.get("/", authenticateToken, async (req, res) => {
    const { q: searchQuery } = req.query;

  try {
    if (!searchQuery || searchQuery.trim() === "") {
      return res.status(400).json({ message: "Search query cannot be empty" });
    }

    const blogs = await blogSchema.find({
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
      ],
    });

    if(!blogs || blogs.length === 0) {
        return res.status(200).json({message: "no blogs found"})
    }

    res.status(200).json({
      message: "search results",
      results: blogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

export default searchBlog;
