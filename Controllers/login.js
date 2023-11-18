import { users } from "../Modals/users.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv";
import { redisConnection } from "../redis.js";
dotenv.config()


export async function loginCheck(email, password) {
    try {

        const user = await users.findOne({ email })
        if (!user) {
            return "user not found"
        }
        const passwordVerify = await bcrypt.compare(password, user.password)
        console.log(passwordVerify, "passwordVerify")
        if (passwordVerify) {
            const token = await jwt.sign(email, process.env.login_securekey)
            const response = {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                token,
                status: true
            }
            await redisConnection.set(`key-${user.email}`, JSON.stringify(response))
            await users.findOneAndUpdate({ email }, { $set: { token: token } }, { new: true })
                .then((res) => console.log(res))
            return response.token
        } else {
            return "Invalid User name or Password"
        }
    } catch (error) {
        console.log(error)
        return "Server Busy"
    }

}





