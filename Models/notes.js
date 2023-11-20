import mongoose from "mongoose";

const notesSchema = mongoose.newSchema({
    title: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true,
    }
})

export const notes = mongoose.Model(notes, notesSchema)