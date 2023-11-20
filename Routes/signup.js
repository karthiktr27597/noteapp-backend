import express from "express"
import { accountActivation, insertVerifyUser, userVerify } from "../Controllers/signup.js";

const router = express.Router()

router.post("/verify", async (req, res) => {
    try {
        const { fullname, email, password } = await req.body;
        console.log(req.body);

        const registeredUser = await userVerify(email)
        console.log(registeredUser)

        if (registeredUser === false) {
            await insertVerifyUser(fullname, email, password)
            return res.status(200).send('Mail Sent')
        } else if (registeredUser === true) {
            return res.status(200).send('User already Registered')
        } else if (registeredUser === "Server Busy") {
            return res.status(500).send("Server Busy")
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
})

router.get("/activation/:token", async (req, res) => {
    try {
        console.log(req.params.token)
        const accountActivated = await accountActivation(req.params.token)
        console.log(accountActivated)
        if (accountActivated === true) {
            return res.redirect("http://localhost:3000/login?newuser=true")
        }
        return res.status(400).send(accountActivated)
    } catch (error) {
        return res.status(500).json({ message: "internal server error" })
    }
})



export const signupRouter = router;