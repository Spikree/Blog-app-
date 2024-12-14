import express from "express"
import createAccount from "./routes/createAccount.js";
import login from './routes/login.js'
import connectToDb from "./utils/connectToDb.js";
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import createBlog from "./routes/blog/createBlog.js";
import getAllBlogs from "./routes/blog/getAllBlogs.js";
import getUserBlogs from "./routes/blog/getUserBlogs.js";
import editBlog from "./routes/blog/editBlog.js";
import getSingleBlog from "./routes/blog/getSingleBlog.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())
app.use(bodyParser.json());
connectToDb();

// server running test
app.get("/", (req,res) => {
 res.json({message: "server is active"})
})

// create account
app.use('/create-account', createAccount);

// login to account
app.use('/login', login);

// create a blog
app.use('/create-blog', createBlog);

// get all blogs
app.use('/get-all-blogs', getAllBlogs);

// get all blogs by user
app.use('/get-user-blogs', getUserBlogs);

// edit blog
app.use('/edit-blog',editBlog)

// get a blog
app.use('/get-a-blog',getSingleBlog);

app.listen(port,() => {
    console.log(`server running on http://localhost:${port}`);
});