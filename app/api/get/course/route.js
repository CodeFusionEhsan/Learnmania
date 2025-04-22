import mongoose from 'mongoose'
import Course from '../../../../models/Course'
import { writeFile } from "fs/promises";
import path from "path";
import {NextResponse} from 'next/server'

export async function POST(req, Response) {
    const formData = await req.formData()
    const id = formData.get("id")

    if (id) {
       await mongoose.connect("mongodb+srv://ehsan:ehsan2024@cluster0.vqrb8yl.mongodb.net/Learnmania?retryWrites=true&w=majority")
            console.log("Connected to database")
      let result = []

      const course = await Course.findById({_id: id})
      result.push(course)
      console.log(course)
      console.log(result)

      if (course) {
        return NextResponse.json({
            result: result,
            success: true
        })
      } else {
        return NextResponse.json({
            message: "Error in Fetching Course Details",
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