import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        forgetpassword: {
            time: Date,
            otp: String,
        },
        activatedon: {
            type: Date,
            default: Date.now()
        },
        token: {
            type: String,
            required: true
        }
    }
)

export const users = mongoose.model("users", userSchema)