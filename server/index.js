import express from "express";
import createAccount from "./routes/createAccount.js";
import login from "./routes/login.js";
import connectToDb from "./utils/connectToDb.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import createBlog from "./routes/blog/createBlog.js";
import getAllBlogs from "./routes/blog/getAllBlogs.js";
import getUserBlogs from "./routes/blog/getUserBlogs.js";
import editBlog from "./routes/blog/editBlog.js";
import getSingleBlog from "./routes/blog/getSingleBlog.js";
import deleteBlog from "./routes/blog/deleteBlog.js";
import likeBlog from "./routes/blog/interactions/likeBlog.js";
import commentOnBlog from "./routes/blog/interactions/commentOnBlog.js";
import getTotalLikes from "./routes/blog/interactions/getTotalLikes.js";
import getTotalComments from "./routes/blog/interactions/getTotalComments.js";
import searchBlog from "./routes/blog/searchBlog.js";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(bodyParser.json());
connectToDb();

// server running test
app.get("/", (req, res) => {
  res.json({ message: "server is active" });
});

// create account
app.use("/create-account", createAccount);

// login to account
app.use("/login", login);

// create a blog
app.use("/create-blog", createBlog);

// get all blogs
app.use("/get-all-blogs", getAllBlogs);

// get all blogs by user
app.use("/get-user-blogs", getUserBlogs);

// edit blog
app.use("/edit-blog", editBlog);

// get a blog
app.use("/get-a-blog", getSingleBlog);

// delete a blog
app.use("/delete", deleteBlog);

// like blog
app.use("/like", likeBlog);

// comment on blog
app.use("/comment", commentOnBlog);

// get total likes
app.use("/get-total-likes", getTotalLikes);

// get total comments
app.use("/get-total-comments", getTotalComments);

// search for blog
app.use("/search", searchBlog);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
