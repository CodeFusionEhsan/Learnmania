import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
    ct: {type: String},
    cd: {type: String},
    image: {type: String},
    uploaded_by: {type: String},
    category: {type: String},
    instructors: {type: String},
    skills: {type: String},
    prerequisites: { type: String },
    patreon: {type: String},
    uploaded_at: {type: String},
    doubts: [
        {
            asked_by: { type: String, null: true },
            doubt: {type: String, null: true}
        }
    ],
    videos: [
        {
            video: {type: String, null: true},
            title: { type: String, null: true },
            description: {type: String, null: true}
        }
    ],
    reviews: [
        {
            by: {type: String, null: true},
            review: {type: String, null: true}
        }
    ],
    total_students: {type: Number, default: 0}
})

const uploadModel = mongoose.models.courses || mongoose.model("courses", uploadSchema);

export default uploadModel