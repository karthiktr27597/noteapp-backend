import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToMongoDB } from "./db.js";
import { userRouter } from "./Routes/user.js";


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

app.use("/signup", userRouter)


// test
app.get("/", (req, res) => {
    res.send("Server working good")
})


// listen
app.listen(port, () => { console.log("Server started in localhost:", port) });


