import mongoose from "mongoose";

const enrollSchema = new mongoose.Schema({
    enrolled_course: {
        course_id: {type: String},
        ct: {type: String},
        cd: {type: String},
        image: {type: String},
        uploaded_by: {type: String},
        category: {type: String},
        instructors: {type: String},
        skills: {type: String},
    },
    enrolled_by: {type: String},
    when: {type: String}
})

const enrollModel = mongoose.models.enrollments || mongoose.model("enrollments", enrollSchema);

export default enrollModel;