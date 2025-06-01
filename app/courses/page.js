'use client'
import { useState, useEffect } from 'react';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('/api/getAllCourses'); // Replace with your API endpoint
      const data = await response.json();
      setCourses(data.result);
    };

    fetchCourses();
  }, []);

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="bg-hero-pattern bg-cover bg-center h-96 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold">Welcome to Learn Mania</h1>
        <h2 className="text-3xl mt-4">Unlock Your Potential</h2>
        <p className="mt-2 max-w-2xl">
          Explore a variety of courses to enhance your skills and knowledge.
        </p>
      </div>

      {/* Course List */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
          <div key={course._id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <img
                    src={`${course.image}`}
                    alt={course.ct}
                    layout="fill"
                    className="h-40 w-full object-cover rounded-t-lg"
            />
            <h3 className="mt-4 text-xl font-semibold">{course.ct}</h3>
            <p className="mt-2 text-gray-400">Uploaded by {course.uploaded_by}</p>
            <p className="mt-2 text-gray-400">Total Students: {course.total_students}</p>
            <a href={`/course/view/${course._id}`} className="mt-4 block bg-blue-500 hover:bg-blue-600 text-center text-white font-bold py-2 px-4 rounded transition duration-200">
              Check Out Course
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
