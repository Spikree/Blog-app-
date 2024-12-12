import express from "express"
import createAccount from "./routes/createAccount.js";
import login from './routes/login.js'
import connectToDb from "./utils/connectToDb.js";
import bodyParser from 'body-parser';
import dotenv from 'dotenv'

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

app.listen(port,() => {
    console.log(`server running on http://localhost:${port}`);
});