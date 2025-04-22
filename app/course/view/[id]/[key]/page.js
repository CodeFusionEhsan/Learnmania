'use client'
import { NextPageContext } from 'next'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const VideoPage = ({params}) => {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const[keydata, setKey]= useState("")

  useEffect(() => {
    const fetchVideoData = async () => {
        const formData = new FormData()
        const {id} = await params
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
          setLoading(false)
        } else {
          console.log(jsres)
        }
    };

    const setKeyData = async () => {
      const {key} = await params
      setKey(key)
    }

    fetchVideoData();
    setKeyData()
  }, []); // Empty dependency array ensures this runs only once after the initial render

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-gray-100"><p className="text-lg text-gray-700">Loading videos...</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      {course.length > 0 ?
        course.map((c, index) => {
            const parsedvideo = JSON.parse(c.videos[keydata].video)
            console.log(parsedvideo)
            return(
                <div key={index} className="container mx-auto p-6 rounded-lg shadow-xl bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Side: Main Video */}
                  <div className="rounded-lg overflow-hidden">
                    <div className="relative aspect-w-16 aspect-h-9">
                    <video controls className='rounded w-175 h-100 object-cover mr-4'>
                      <source src={parsedvideo.secure_url} type="video/mp4"/>
                    </video>
                    </div>
                    <div className="mt-4 p-4">
                      <h2 className="text-2xl font-semibold text-gray-800">{c.ct}</h2>
                      <p className="mt-2 text-gray-600">{c.cd}</p>
                    </div>
                  </div>
        
                  {/* Right Side: Video List and Patreon */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">More Videos</h3>
                    <ul className="space-y-4">
                      {c.videos.slice(keydata, c.videos.length).map((video, key) => {
                        const parsedvideo = JSON.parse(video.video)
                        console.log(parsedvideo)
                        return(
                        <li key={key} className="flex items-center rounded-md shadow-sm overflow-hidden">
                          <div className="w-24 h-16 bg-gray-200 flex-shrink-0">
                            {/* Placeholder for video thumbnail - replace with actual thumbnail URL */}
                            <video controls className='rounded w-full h-20 object-cover mr-4'>
                <source src={parsedvideo.secure_url} type="video/mp4"/>
              </video>
                          </div>
                          <div className="ml-3">
                            <h4 className="text-sm font-medium text-gray-800">{video.title}</h4>
                            {c.uploaded_by && <p className="text-xs text-gray-500">{c.uploaded_by}</p>}
                          </div>
                        </li>
                      )})}
                    </ul>
        
                    {/* Patreon Link */}
                    <div className="mt-8">
                      <Link href={c.patreon} target="_blank" className="inline-block bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out">
                        Support on Patreon
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
        })
      : <></>}
    </div>
  );
};

export default VideoPage;

