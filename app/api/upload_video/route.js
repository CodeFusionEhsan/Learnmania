import mongoose from 'mongoose'
import Course from '../../../models/Course'
import { writeFile } from "fs/promises";
import path from "path";
import {NextResponse} from 'next/server'

export async function POST(req, Response) {
    const formData = await req.formData()
    const id = formData.get("course_id")
    const vt = formData.get('vt')
    const resource = formData.get('resource')
    const desc = formData.get('desc')
    console.log(vt, resource, desc)

    if (vt && desc && resource) {
       await mongoose.connect("mongodb+srv://ehsan:ehsan2024@cluster0.vqrb8yl.mongodb.net/Learnmania?retryWrites=true&w=majority")
            console.log("Connected to database") 

       const obj = {
        video: resource,
        title: vt,
        description: desc
       }
      
      const result = await Course.updateOne({_id: id}, {
        $push: {videos: obj}
      })

      if (result) {
        return NextResponse.json({
            message: "Video Uploaded Successfully",
            success: true
        })
      } else {
        return NextResponse.json({
            message: "Error in Uploading Video",
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