import express from "express"
import dotenv from "dotenv"
import { forgotPassword, passwordVerify } from "../Controllers/password.js"
import { users } from "../Models/users.js"
dotenv.config()


const router = express.Router()

router.post("/forgotpassword", async (req, res) => {
    try {
        const { email } = req.body
        const findUser = await forgotPassword(email)

        if (findUser === "Mail Sent") {
            return res.status(200).send("Mail Sent")

        } else if (findUser === false) {
            return res.status(200).send("User not found")
        } else if (findUser === "Server Busy") {
            return res.status(200).send("Server Busy")
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
})


router.get("/verify", async (req, res) => {
    try {
        const findrandomstring = await users.findOne({ randomstring: req.query.randomstring })
        console.log(findrandomstring)
        return res.redirect(`http://localhost:3000/passwordreset/${findrandomstring._id}`)
    } catch (error) {
        console.log(error)
        return res.status(500).json("internal server error")
    }
})

router.post("/reset", async (req, res) => {
    console.log(req.body)
    try {
        const { id, password, confirmPassword } = req.body

        if (password !== confirmPassword) {
            return res.status(200).send("Password Mismatched")
        }

        const updatePassword = await passwordVerify(id, password)

        if (updatePassword === true) {
            return res.status(200).send("Password Updated")
        } else if (updatePassword === "Server Busy") {
            return res.status(200).send("Server Busy")
        } else if(updatePassword === "User not found"){
            return res.status(200).send("User not found")
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json("internal server error")
    }
})





export const passwordRouter = router;