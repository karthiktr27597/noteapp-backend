import express from "express"
import { loginCheck } from "../Controllers/login.js"

const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body
        const response = await loginCheck(email, password)

        if (response === "user not found") {
            return res.status(200).send("Please Signup for continue...")
        } else if (response === "Invalid User name or Password") {
            return res.status(200).send("Invalid User name or Password")
        } else if (response === "Server Busy") {
            return res.status(200).send("Server Busy")
        }

        return res.status(200).json({ token: response })

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")

    }
})


export const loginRouter = router;