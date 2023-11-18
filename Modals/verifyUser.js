import mongoose from "mongoose";

const verifyUserSchema = mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
)

export const verifyUser = mongoose.model("verifyUser", userSchema)