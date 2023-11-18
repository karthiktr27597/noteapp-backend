import express from "express"
import { sendMail } from "../Controllers/Services/mailservice.js"
import { userVerify } from "../Controllers/signup.js";

const router = express.Router()

router.post("/verify", async (req, res) => {
    try {

        const { fullname, email, password } = await req.body;

        const registeredUser = await userVerify(email)

        if (registeredUser === false) {
            return
        } else if (registeredUser === true) {
            return res.status(200).send('User already Registered')
        } else if (registeredUser === "Server Busy") {
            return res.status(500).send("Server Busy")
        }

        const url = '<a href="http://localhost:9000/signup">clickhere</a>'
        const subject = 'NoteApp SignUp Activation'
        const content = `Hello ${fullname},
        ${url} for activate your account`

        console.log(req.body)

        const emailResponse = await sendMail(email, subject, content)

        console.log(emailResponse, 'check')

    } catch (error) {

        console.log(error)
        return res.status(500).json({ message: "internal server error" })

    }
})


export const userRouter = router;