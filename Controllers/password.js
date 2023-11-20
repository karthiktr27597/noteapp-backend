import { users } from "../Models/users.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { sendMail } from "./Services/mailservice.js";
dotenv.config()



export async function forgotPassword(email) {
    try {
        const checkedUser = await users.findOne({ email })
        console.log('checkuser', checkedUser)
        if (!checkedUser) {
            return false
        }
        const randomstring = process.env.randomstring + checkedUser._id
        const updateRandomString = await users.findByIdAndUpdate({ _id: checkedUser._id }, { $set: { randomstring: randomstring } }, { new: true })
        console.log(updateRandomString)
        const url = `http://localhost:9000/password/verify?randomstring=${randomstring}`

        const content = `<h3>Hello ${checkedUser.fullname},</h3>
        <h4>Click below link for Password Reset</h4>
        <a href=${url}>Click Here</a>
        <p>Regards</p>
        <p>NoteApp Team</p>`

        sendMail(email, 'Password-Reset link NoteApp', content)
        console.log(sendMail);


        return "Mail Sent"
    } catch (error) {
        console.log(error)
        return 'Server Busy'
    }
}

export async function passwordVerify(id, password) {
    try {
        const findUser = await users.findById(id)
        if(!findUser){
            return "User not found"
        }
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)
        await users.findByIdAndUpdate({ _id: id }, { $set: { password: hashedpassword } }, { new: true })
        return true

    } catch (error) {
        console.log(error)
        return 'Server Busy'
    }

}
