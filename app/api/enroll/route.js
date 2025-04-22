import mongoose from 'mongoose'
import Enrollment from '../../../models/Enrollment'
import { writeFile } from "fs/promises";
import path from "path";
import {NextResponse} from 'next/server'

export async function POST(req, Response) {
    const formData = await req.formData()
    const ct = formData.get('ct')
    const course_id = formData.get('course_id')
    const cd = formData.get('cd')
    const file = formData.get('image')
    const uploaded_by = formData.get('uploaded_by')
    const enrolled_by = formData.get('enrolled_by')
    const category = formData.get('categ')
    const skills = formData.get('skills')
    const enrolled_at = formData.get('enrolled_at')
    const instruc = formData.get("instruc")

    if (uploaded_by && ct) {
         await mongoose.connect(process.env.MONGO_URI)
              console.log("Connected to database")
              
      const enroll_obj = {
        enrolled_course: {
            course_id: course_id,
            ct: ct,
            cd: cd,
            image: file,
            uploaded_by: uploaded_by,
            category: category,
            instructors: instruc,
            skills: skills
        },
        enrolled_by: enrolled_by,
        when: enrolled_at
      }

      const newEnroll = new Enrollment(enroll_obj)

      const result = await newEnroll.save()

      if(result) {
        console.log(result)
        return NextResponse.json({
          success: true,
          result: result
        })
      } else {
        return NextResponse.json({
          success: false,
        })
      }
    } else {
      return NextResponse.json({
        message: "Please fill all the fields",
        success: false
      })
    }
}
