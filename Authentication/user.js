import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { redisConnection } from "../redis.js";
import { users } from "../Models/users.js";
dotenv.config();


export async function isAuthenticated(token) {
    try {
        const email = jwt.verify(token, process.env.login_securekey)
        if (email) {
            const auth = await redisConnection.get(`key-${email}`)
            if (auth) {
                const data = JSON.parse(auth)
                return data
            } else {
                const data = await users.findOne({ email })
                return data
            }
        }
        return false
    } catch (error) {
        console.log(error)
    }
}


// export async function isAuthenticated(req, res, next) {
//     const token = await req.headers.authroization
//     console.log(token)
//     if (!token) {
//         return res.status(401).json({ message: "Invalid Authorization" })
//     }
//     jwt.verify(token, process.env.SECURE_KEY, (err, decoded) => {
//         if (err) {
//             if (err.name = "TokenExpiredError") {
//                 return res.status(401).json({ message: "Token expired" })
//             }
//             return res.status(500).json({ message: "Failed Authentication token" })
//         }
//         next();
//     });
// }

