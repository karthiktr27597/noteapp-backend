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
        activatedon: {
            type: Date,
            default: Date.now()
        }
    }
)

export const users = mongoose.model("users", userSchema)