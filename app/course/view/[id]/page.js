'use client'

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

const CourseDetailPage = () => {
    const router = useSearchParams()
    console.log(router.get('id'))

    const { user, error, isLoading } = useUser();
  
    const[resource, setResource] = useState()
    const[title, setTitle] = useState("")
    const[desc, setDesc] = useState("")
    const[course, setCourse] = useState([])
    const[name, setName] = useState("")
    const[review, setReview] = useState("")
  
    const getCourse = async () => {
      const formData = new FormData()
      const url = window.location.href
      const id = url.replace("https://learnmania.vercel.app/course/view/", "")
      console.log(id)
      formData.append("id", id)
  
      const res = await fetch('/api/get/course/', {
        method: "POST",
        body: formData
      })
  
      const jsres = await res.json()
  
      if (jsres.success == true) {
        setCourse(jsres.result)
        console.log("data has been set")
      } else {
        console.log(jsres)
      }
    }
  
    useEffect(() => {
      setTimeout(async() => {
        await getCourse()
      }, 3000)
    }, [])
  
    const handleReview = async () => {
      const formData = new FormData()
      const id = router.get('id')
      formData.append("course_id", course_id)
      formData.append("name", name)
      formData.append("review", review)
  
      const res = await fetch('/api/upload_review/', {
        method: "POST",
        body: formData
      })
  
      const jsres = await res.json()
  
      if (jsres.success == true) {
        window.location.reload()
      } else {
        console.log(jsres)
      }
    }

    const handleEnroll = async () => {
      const formData = new FormData()
      formData.append("course_id", course[0]._id)
      formData.append("ct", course[0].ct)
      formData.append("cd", course[0]._id)
      formData.append("image", course[0].image)
      formData.append("uploaded_by", course[0].uploaded_by)
      formData.append("skills", course[0].skills)
      formData.append("instruc", course[0].instructors)
      formData.append("category", course[0].category)
      formData.append("enrolled_by", user.email)
      const today = new Date().toLocaleDateString()
      formData.append("enrolled_at", today)

      const res = await fetch('/api/enroll', {
        method: "POST",
        body: formData
      })

      const jsres = await res.json()

      if (jsres.success == true) {
        window.location.reload()
      } else {
        console.log(jsres)
      }
    }

  if (course.length != 1) {
    return <div className="flex justify-center items-center h-screen">Loading course details...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden md:flex">
          {/* Left Side: Course Preview and Details */}
          <div className="md:w-1/2 p-6">
            <div className="relative w-full h-80 md:h-auto rounded-md overflow-hidden mb-4">
            <img src={`/images/${course[0].image}`} alt={course[0].ct} className="rounded-lg mb-4 w-full h-60 object-cover" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{course[0].ct}</h2>
            <p className="text-gray-600 mb-4">{course[0].cd}</p>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Course Details</h3>
              <ul className="list-disc list-inside text-gray-500 mb-6">
                <li>Instructor: {course[0].instructors}</li>
                {/* Add more details as needed */}
              </ul>
            </div>
            <Link
                href="#"
                onClick={handleEnroll}
                className="relative px-6 py-2.5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full 
                         transform transition-all duration-300 hover:scale-105 hover:shadow-glow hover:shadow-cyan-400/30
                         before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-400 before:to-blue-400 
                         before:rounded-full before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
              >
                <span className="relative z-10">Enroll Course</span>
              </Link>
              <div className="bg-white shadow-lg rounded-lg mt-6 mb-6 p-6">
           <h3 className="text-xl font-bold mb-4">Upload Review</h3>
           <input value={name} onChange={(e) => {setName(e.target.value)}} type="text" placeholder="Name..." className="mb-4 w-full border border-gray-300 rounded p-2"/>
           <textarea value={review} onChange={(e) => {setReview(e.target.value)}} type="text" rows={6} placeholder="Review..." className="mb-4 w-full border border-gray-300 rounded p-2"></textarea>
           <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleReview}>Upload Review</button>
         </div>
          </div>

          {/* Right Side: Videos and Reviews */}
          <div className="md:w-1/2 bg-gray-50 p-6 border-l border-gray-200">
            {/* Videos Section */}
            <div className="bg-white shadow-lg rounded-lg mb-6 p-6">
          <h3 className="text-xl font-bold mb-4">Course Videos</h3>
          {course.length > 0 ? course[0].videos.map((video, index) => {
            const parsedvideo = JSON.parse(video.video)
            console.log(parsedvideo)
            return(
              <div key={index} className="flex items-center border-b py-3">
              <video controls className='rounded w-20 h-20 object-cover mr-4'>
                <source src={parsedvideo.public_id} type="video/mp4"/>
              </video>
              <div>
                <h4 className="font-semibold">{video.title}</h4>
                <p className="text-gray-600">Uploaded By: {course.uploaded_by}</p>
              </div>
            </div>
            )
          }) : <></>}
        </div>

            {/* Reviews Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Reviews</h3>
          {course.length>0 ? course[0].reviews.map((review, index) => (
            <div key={index} className="border-b py-3">
              <p className="font-semibold">{review.reviewerName}</p>
              <p className="text-gray-700">{review.review}</p>
            </div>
          )): <></>}
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
