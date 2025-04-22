"use client";
import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/navigation';

const UploadPage = () => {
  const { user, error, isLoading } = useUser();

  const[ct, setCt] = useState("")
  const[cd, setCd] = useState("")
  const[categ, setCateg] = useState("")
  const[instruc, setInstruc] = useState("")
  const [skills, setSkills] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const [patreon, setPatreon] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [success, setSuccess]= useState(false)
  const [resource, setResource] = useState(null)

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    setResource(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault()
    console.log(resource)
    const formData = new FormData()
    formData.append("ct", ct)
    formData.append("cd", cd)
    formData.append("image", resource)
    formData.append("categ", categ)
    formData.append("prerequisites", prerequisites)
    formData.append("skills", skills)
    formData.append("instruc", instruc)
    formData.append("patreon", patreon)
    formData.append("uploaded_by", user.email)
    var today = new Date()
    formData.append("uploaded_at", today.toLocaleDateString("en-US"))

    const res = await fetch('/api/upload', {
      method: "POST",
      body: formData
    })

    const parsedres = await res.json()
    console.log(parsedres)

    if (parsedres.success == true) {
      setSuccess(true)

      setTimeout(() => {
        setSuccess(false)
      }, 15000)

      window.location.reload()
    } else {
        alert("Error in Uploading Course")
        setTimeout(() => {
          window.location.reload()
        }, 10000)
    }
  }

  if (isLoading) {
    return(
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
            <h1 className="text-3xl text-center justify-center font-bold text-white">Loading Content...</h1>
            <div className="loader mt-4 text-center justify-center"></div>
            <p className="text-gray-400 mt-2">Please wait while we process your request.</p>
        </div>
      </div>
    )
  }

  if(success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-600 to-blue-800">
        <div className="bg-gray-800 shadow-xl rounded-lg p-8 text-center">
          <div className="text-green-400 text-6xl mb-4">
            ✔️
          </div>
          <h1 className="text-white text-3xl font-bold mb-2">
            Success!
          </h1>
          <h2 className="text-gray-300 text-xl mb-4">
            Your course has been created.
          </h2>
          <p className="text-gray-400">
            You can now start sharing your knowledge and help others learn. 
            Thank you for contributing to our community!
          </p>
  
          {/* Optional button to return to the dashboard */}
          <div className="mt-6">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
    {user ? 
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-jost">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-100 mb-8 text-center">
          Create New Course
        </h1>

        <form onSubmit={(e) => {handleUpload(e)}} className="space-y-8 bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
          {/* Course Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Course Title
            </label>
            <input
              value={ct}
              onChange={(e) => {setCt(e.target.value)}}
              type="text"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 
                         focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              placeholder="Mastering Next.js 14"
            />
          </div>

          {/* Course Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Course Description
            </label>
            <textarea
              value={cd}
              onChange={(e) => {setCd(e.target.value)}}
              rows={4}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 
                         focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              placeholder="Detailed description of your course..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Course Preview Image
            </label>
            <div className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-600 rounded-xl">
              <div className="space-y-1 text-center">
                {previewImage ? (
                  <img src={previewImage} className="mx-auto h-32 w-48 object-cover rounded-lg" />
                ) : (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-400">
                      <label className="cursor-pointer rounded-md font-medium text-cyan-500 hover:text-cyan-400">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          onChange={handleImageUpload}
                          accept="image/*"
                          id='filevid'
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Category & Instructors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                value={categ}
                onChange={(e) => {setCateg(e.target.value)}}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 
                           focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              >
                <option>Web Development</option>
                <option>Mobile Development</option>
                <option>Data Science</option>
                <option>UI/UX Design</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Instructors
              </label>
              <input
                value={instruc}
                onChange={(e) => {setInstruc(e.target.value)}}
                type="text"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 
                           focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                placeholder="Separate names with commas"
              />
            </div>
          </div>

          {/* Skills & Prerequisites */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Skills Taught
              </label>
              <input
                value={skills}
                onChange={(e) => {setSkills(e.target.value)}}
                type="text"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 
                           focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                placeholder="Add skills separated by commas"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Prerequisites
              </label>
              <input
                value={prerequisites}
                onChange={(e) => {setPrerequisites(e.target.value)}}
                type="text"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 
                           focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                placeholder="Add prerequisites separated by commas"
              />
            </div>
          </div>

          {/* Patreon Link */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Patreon Link (Optional)
            </label>
            <input
              value={patreon}
              onChange={(e) => {setPatreon(e.target.value)}}
              type="url"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 
                         focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              placeholder="https://patreon.com/yourpage"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-12">
            <button
              type="submit"
              className="w-full py-3.5 px-6 text-gray-900 bg-gradient-to-r from-gray-100 to-gray-300 
                         rounded-xl font-semibold transform transition-all duration-300 hover:scale-[1.02] 
                         hover:shadow-glow hover:shadow-cyan-400/20 flex items-center justify-center gap-2"
            >
              <span className="text-lg">Publish Course</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </form>
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

export default UploadPage;
