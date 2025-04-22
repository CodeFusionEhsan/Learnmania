'use client'

import React, { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useAuth0 } from "@auth0/auth0-react";
import Link from 'next/navigation';
import { useState } from 'react';
import CoursesGrid from '@/components/coursegrid';
import CoursesGrid2 from '@/components/coursegrid2';

const AccountPage = () => {
  const { user, error, isLoading, isAuthenticated } = useUser();
  const [uploaded_courses, setUploaded] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [enrolled_courses, setEnrolled] = useState([])
  const [loading, setLoading] = useState(true)

  const getUploaded = async () => {
    if(!isLoading) {
      const formData = new FormData()
      formData.append("id", user.email)

      const res = await fetch("/api/uploaded_courses", {
        method: "POST",
        body: formData
      })

      const parsedres = await res.json()

      setUploaded(parsedres.result)
      setLoaded(true)
    }
    else {
      
    }
  }

  const getEnrolled = async () => {
    if(!isLoading) {
      const formData = new FormData()
      formData.append("id", user.email)

      const res = await fetch("/api/get_enrolled", {
        method: "POST",
        body: formData
      })

      const parsedres = await res.json()

      setEnrolled(parsedres.result)
      setLoading(true)
    }
    else {
      
    }
  }

  useEffect(() => {
    getUploaded()
    getEnrolled()
  }, [user])

  if (isLoading) {
    return(
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Loading Content...</h1>
            <div className="loader mt-4"></div>
            <p className="text-gray-400 mt-2">Please wait while we process your request.</p>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    window.location = "/api/auth/logout"
    alert('Logged out successfully!');
  };


  return (
    <div>
    {user ? 
      <div className="flex flex-col w-full items-center justify-center bg-gray-900 text-white">
      {/* User Card */}
      <div className="bg-gray-800 rounded-lg mt-4 shadow-lg p-6 w-80 text-center">
        <img className="w-24 h-24 rounded-full mx-auto mb-4" src={user.picture} alt="Profile Picture" />
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p className="text-sm text-gray-400">{user.email}</p>
        <button 
          onClick={handleLogout} 
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        >
          Logout
        </button>
      </div>

      {/* Enrolled Courses */}
      <div className="mt-4 w-full">
        <h3 className="text-lg font-semibold mb-2 text-center">Enrolled Courses</h3>
        {loaded ?
          <>
            <CoursesGrid2 courses={enrolled_courses} />
          </>
          :
          <>
          
          </>
        }
      </div>

      {/* Uploaded Courses */}
      <div className="mt-4 w-full">
        <h3 className="text-lg font-semibold mb-2 text-center">Uploaded Courses</h3>
        {loaded ?
          <>
            <CoursesGrid courses={uploaded_courses} />
          </>
          :
          <>
          
          </>
        }
      </div>
    </div>
    :
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-600 to-blue-600 text-white">
    <h1 className="text-4xl font-bold mb-4">Welcome to Learn | Mania</h1>
    <h2 className="text-2xl font-semibold mb-4">Your Journey Begins Here</h2>
    <p className="text-center mb-8 max-w-md">
        Join us to unlock a world of knowledge and enhance your skills. Sign in to access your personalized dashboard and start creating amazing courses!
    </p>
    <Link href="/api/auth/login" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105">
        Login to Your Account
    </Link>
</div>
    </div>
    }
  </div>
  );
};

export default AccountPage;
