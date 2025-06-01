import mongoose from 'mongoose'
import Course from '../../../models/Course'
import { writeFile } from "fs/promises";
import path from "path";
import {NextResponse} from 'next/server'

export async function POST(req, Response) {
    const formData = await req.formData()
    const ct = formData.get('ct')
    const cd = formData.get('cd')
    const file = formData.get('image')
    const uploaded_by = formData.get('uploaded_by')
    const category = formData.get('categ')
    const prerequisites = formData.get('prerequisites')
    const skills = formData.get('skills')
    const patreon = formData.get('patreon')
    const uploaded_at = formData.get('uploaded_at')
    const instruc = formData.get("instruc")
    console.log(ct, cd, file, uploaded_by, category, prerequisites, patreon, skills, uploaded_at, instruc)

    if (uploaded_by && ct) {
      await mongoose.connect(process.env.MONGO_URI)
      console.log("Connected to database")

      const newupload = new Course({
        ct: ct,
        cd: cd,
        image: file,
        uploaded_by: uploaded_by,
        category: category,
        instructors: instruc,
        skills: skills,
        prerequisites: prerequisites,
        patreon: patreon,
        uploaded_at: uploaded_at
      })

      const result = await newupload.save()

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
