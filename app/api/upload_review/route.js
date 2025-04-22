import mongoose from 'mongoose'
import Course from '../../../models/Course'
import { writeFile } from "fs/promises";
import path from "path";
import {NextResponse} from 'next/server'

export async function POST(req, Response) {
    const formData = await req.formData()
    const id = formData.get("course_id")
    const name = formData.get('vt')
    const review = formData.get('review')
    console.log(name, review)

    if (name && review) {

       await mongoose.connect("mongodb+srv://ehsan:ehsan2024@cluster0.vqrb8yl.mongodb.net/Learnmania?retryWrites=true&w=majority")
            console.log("Connected to database")

       const obj = {
        by: name,
        review: review
       }
      
      const result = await Course.updateOne({_id: id}, {
        $push: {reviews: obj}
      })

      if (result) {
        return NextResponse.json({
            message: "Review Uploaded Successfully",
            success: true
        })
      } else {
        return NextResponse.json({
            message: "Error in Uploading Review",
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