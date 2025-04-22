import mongoose from 'mongoose'
import Course from '../../../../models/Course'
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
    const course_id = formData.get("course_id")
    console.log(ct, cd, file, uploaded_by, category, prerequisites, patreon, skills, uploaded_at, instruc)

    if (uploaded_by && ct) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const filename = Date.now() + file.name.replaceAll(" ", "_")
      await writeFile(path.join(process.cwd(), "public/images/"+ filename), buffer)
      await mongoose.connect(process.env.MONGO_URI)
      console.log("Connected to database")

      const newupdate = {
        ct: ct,
        cd: cd,
        image: filename,
        uploaded_by: uploaded_by,
        category: category,
        instructors: instruc,
        skills: skills,
        prerequisites: prerequisites,
        patreon: patreon,
        uploaded_at: uploaded_at
      }

      const result = await Course.findOneAndUpdate({_id: course_id}, newupdate)

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
