import { users } from "../Modals/user.js";
import bcrypt from "bcrypt"



export async function userVerify(email) {
    try {
        const checkUser = await users.find({ email })
        if (checkUser) {
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
        const hashedpassword = await bcrypt.hash(email, salt)

    } catch (error) {

    }

}