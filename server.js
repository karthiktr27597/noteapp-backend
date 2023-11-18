import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToMongoDB } from "./db.js";
import { signupRouter } from "./Routes/signup.js";
import { loginRouter } from "./Routes/login.js";
import { homeRouter } from "./Routes/home.js";


// server initiation
const app = express()

// middleware
app.use(express.json())
app.use(cors())
dotenv.config()

//PORT
const port = process.env.port;


// db connection through mongoosh
connectToMongoDB()


// application middleware

app.use("/signup", signupRouter)
app.use("/login", loginRouter)
app.use("/home", homeRouter)


// test
app.get("/", (req, res) => {
    res.send("Server working good")
})


// listen
app.listen(port, () => { console.log("Server started in localhost:", port) });


