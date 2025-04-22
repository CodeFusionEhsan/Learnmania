import Course from '../../../models/Course'
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

export async function POST(req) {
    if (req.method == "POST") {
        const data = await req.formData()
        const id = data.get("id")
        console.log(id)
        await mongoose.connect(process.env.MONGO_URI)
                        console.log("Connected to database")
        const courses = await Course.find({uploaded_by: id})
        console.log(courses)
        return NextResponse.json({
            success: true,
            result: courses
        })
    } else {
        return NextResponse.json({
            success: false,
            message: "Only POST Method Allowed!"
        })
    }
}
