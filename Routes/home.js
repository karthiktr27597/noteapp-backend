import express from "express";
import { isAuthenticated } from "../Authentication/user.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const auth_token = await req.headers.authorization
        console.log('home', auth_token)
        if (!auth_token) {
            return res.status(400).send("Invalid Authorization")
        }
        const loginAuthorization = await isAuthenticated(auth_token)
        if (loginAuthorization) {
            return res.status(200).send(true)
        }
        return res.status(400).send("Invalid Authorization")
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }

})


export const homeRouter = router