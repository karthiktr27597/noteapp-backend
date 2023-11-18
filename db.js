import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export async function connectToMongoDB() {
    try {
        await mongoose.connect(process.env.mongoose_url)
            .then((res) => console.log('DB connected'))
    } catch (err) {
        console.log(err)
    }
}
