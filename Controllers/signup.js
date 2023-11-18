import { users } from "../Modals/users.js";
import bcrypt from "bcrypt"
import { verifyUser } from "../Modals/verifyUser.js";
import { sendMail } from "./Services/mailservice.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()


export async function userVerify(email) {
    try {
        const checkUser = await users.find({ email })
        console.log('checkuser', checkUser)
        if (!checkUser) {
            return false
        }
        return true
    } catch (error) {
        return 'Server Busy'
    }
}


export async function insertVerifyUser(fullname, email, password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt)
        const token = generateToken(email)
        console.log(token)


        const newUser = await new verifyUser({
            fullname,
            email,
            password: hashedpassword,
            token
        })

        const activationLink = `http://localhost:9000/signup/activation/${token}`
        const subject = 'NoteApp SignUp Activation'
        const content = `<h3>Hello ${fullname},</h3>
        <h4>Welcome to our App</h4>
        <p>Thanks for signing up, Click below link to activate your account,</P
        <a href=${activationLink}>Click Here</a>
        <p>Regards</p>
        <p>Team</p>`

        await newUser.save()
        sendMail(email, subject, content)

    } catch (error) {
        console.log(error)
    }
}

export async function accountActivation(token) {
    try {
        const verifiedUser = await verifyUser.findOne({ token })
        if (verifiedUser) {
            const activatedUser = await new users(
                {
                    fullname: verifiedUser.fullname,
                    email: verifiedUser.email,
                    password: verifiedUser.password,
                    token: verifiedUser.token,
                }
            )
            await activatedUser.save()
            await verifiedUser.deleteOne({ token })

            const loginlink = `http://lochalhost:3000/login`
            const content = `<h3>Welcome ${verifiedUser.fullname},</h3>
            <h4>Your Account has been activated, Login to continue...</h4>
            <a href=${loginlink}>Login</a>
            <p>Regards</p>
            <p>NoteApp Team</p>`

            sendMail(verifiedUser.email, "NodeApp-SignUp Done Successfully", content)
            return true
        } else {
            return `<h3>Sorry ${verifiedUser.fullname},</h3>
            <h4>Account activation not successful, Please try again...</h4>
            <p>Regards</p>
            <p>NoteApp Team</p>`
        }

    } catch (error) {
        console.log(error)
    }
}



const generateToken = (email) => {
    return jwt.sign(
        { email },
        process.env.signup_securekey
    )
}