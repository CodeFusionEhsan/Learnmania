import Course from '../../../models/Course'
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

export async function GET(req) {
    if (req.method == "GET") {
        await mongoose.connect(process.env.MONGO_URI)
                        console.log("Connected to database")
        const courses = await Course.find()
        console.log(courses)
        return NextResponse.json({
            success: true,
            result: courses
        })
    } else {
        return NextResponse.json({
            success: false,
            message: "Only GET Method Allowed!"
        })
    }
}
