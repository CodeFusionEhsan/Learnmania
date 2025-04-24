'use client'

import { useSearchParams } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const CoursePage = () => {
  const router = useSearchParams()
  console.log(router.get('id'))

  const[resource, setResource] = useState()
  const[title, setTitle] = useState("")
  const[desc, setDesc] = useState("")
  const[course, setCourse] = useState([])
  const[name, setName] = useState("")
  const[review, setReview] = useState("")

  const getCourse = async () => {
    const formData = new FormData()
    const url = window.location.href
    const id = url.replace("http://learnmania.vercel.app/course/admin/", "")
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

  const handleOnClick = async () => {
    const formData = new FormData()
    const url = window.location.href
    const id = url.replace("http://localhost:3000/course/admin/", "")
    formData.append("course_id", id)
    formData.append("resource", JSON.stringify(resource))
    formData.append("vt", title)
    formData.append("desc", desc)

    const res = await fetch('/api/upload_video/', {
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

  const handleDelete = async () => {
    const formData = new FormData()
    const id = url.replace("http://localhost:3000/course/admin/", "")
    formData.append("course_id", id)

    const res = await fetch('/api/delete/course', {
      method: "POST",
      body: formData
    })

    const jsres = await res.json()

    if (jsres.success == true) {
      window.location = "/"
    } else {
      console.log(jsres)
    }
  }

  const handleredirect = (key, c_id) => {
    window.location = `/course/admin/video/${c_id}/${key}`
  }

  return (
    <div className="flex flex-col md:flex-row p-6 bg-gray-100">
      {/* Left Side - Course Details */}
      {course.length > 0 ?
         <div className="w-full md:w-1/2 p-4">
         <div className="bg-white shadow-lg rounded-lg p-6">
           <h2 className="text-2xl font-bold mb-4">{course[0].ct}</h2>
           <img src={`/images/${course[0].image}`} alt={course[0].ct} className="rounded-lg mb-4 w-full h-48 object-cover" />
           <p className="text-gray-700 mb-6">{course[0].cd}</p>
           <Link
                href={`/update/course/${course[0]._id}`}
                className="relative px-6 mt-8 py-2.5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full 
                         transform transition-all duration-300 hover:scale-105 hover:shadow-glow hover:shadow-cyan-400/30
                         before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-400 before:to-blue-400 
                         before:rounded-full before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
              >
                <span className="relative z-10">Update Course</span>
              </Link>
              <Link
                              href="#"
                              onClick={handleDelete}
                              className="relative ml-2 mt-8 px-6 py-2.5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full 
                                       transform transition-all duration-300 hover:scale-105 hover:shadow-glow hover:shadow-cyan-400/30
                                       before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-400 before:to-blue-400 
                                       before:rounded-full before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
                            >
                              <span className="relative z-10">Delete Course</span>
                            </Link>
         </div>
       </div> : <></>
      }
     

      {/* Right Side - Video Upload and Reviews */}
      <div className="w-full md:w-1/2 p-4">
        <div className="bg-white shadow-lg rounded-lg mb-6 p-6">
          <h3 className="text-xl font-bold mb-4">Upload Video</h3>
          <input value={title} onChange={(e) => {setTitle(e.target.value)}} type="text" placeholder="Title..." className="mb-4 w-full border border-gray-300 rounded p-2"/>
          <textarea value={desc} onChange={(e) => {setDesc(e.target.value)}} type="text" rows={6} placeholder="Description..." className="mb-4 w-full border border-gray-300 rounded p-2"></textarea>
          <CldUploadWidget
        uploadPreset="ajiy2qfo"
        onSuccess={(result, { widget }) => {
          setResource(result?.info);
          console.log(resource)
          widget.close();
        }}
      >
        {({ open }) => {
          function handleOnClick() {
            setResource(undefined);
            open();
          }
          return (
            <button className='bg-blue-500 text-white py-2 px-4 rounded mr-4' onClick={handleOnClick}>
              Upload Video
            </button>
          );
        }}
      </CldUploadWidget>
          <button onClick={handleOnClick} className="bg-blue-500 text-white py-2 px-4 rounded">Upload Video To Course</button>
        </div>

        {/* Video List */}
        <div className="bg-white shadow-lg rounded-lg mb-6 p-6">
          <h3 className="text-xl font-bold mb-4">Course Videos</h3>
          {course.length > 0 ? course[0].videos.map((video, index) => {
            const parsedvideo = JSON.parse(video.video)
            console.log(parsedvideo)
            return(
              <div key={index} className="flex items-center border-b py-3">
              <video controls className='rounded w-20 h-20 object-cover mr-4'>
                <source src={parsedvideo.secure_url} type="video/mp4"/>
              </video>
              <div>
                <h4 onClick={() => handleredirect(index, course[0]._id)} className="font-semibold">{video.title}</h4>
                <p className="text-gray-600">Uploaded By: {course[0].uploaded_by}</p>
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
  );
};

export default CoursePage;
