import express from "express"
import { loginCheck } from "../Controllers/login.js"

const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body
        const response = await loginCheck(email, password)

        if (response === "user not found") {
            return res.status(400).send("Please Signup for continue...")
        }

        return res.status(200).json(response)

    } catch (error) {

    }
})


export const loginRouter = router;