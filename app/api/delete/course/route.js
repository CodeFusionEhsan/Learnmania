import mongoose from 'mongoose'
import Course from '../../../models/Course'
import { writeFile } from "fs/promises";
import path from "path";
import {NextResponse} from 'next/server'

export async function POST(req, Response) {
    const formData = await req.formData()
    const course_id = formData.get("course_id")

    if (course_id) {
         await mongoose.connect(process.env.MONGO_URI)
              console.log("Connected to database")
        
      const result = await Course.deleteOne({_id: course_id})

      if (result) {
        return NextResponse.json({
            message: "Course Deleted",
            success: true
          })
      } else {
        return NextResponse.json({
            message: "Error in Deleteing Course",
            success: false
          })
      }
    } else {
      return NextResponse.json({
        message: "Please fill all the fields",
        success: false
      })
    }
}
