'use client'

import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';// Using Font Awesome icons (install @fortawesome/react-fontawesome and @fortawesome/free-solid-svg-icons)
import { useUser } from '@auth0/nextjs-auth0/client';
import { useAuth0 } from "@auth0/auth0-react";
import useData from './hooks/get_uploaded';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user, isAuthenticated, isLoading } = useAuth0();

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
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{isAuthenticated && user ? user.name : "" } Unlock Your Potential with Expert-Led Courses</h1>
          <p className="text-lg mb-8">Learn new skills, advance your career, and connect with a community of learners.</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {}}
              className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-full hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
            >
              Explore Courses
            </button>
            <button
              onClick={() => {}}
              className="bg-purple-400 text-white font-semibold py-3 px-6 rounded-full hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
            >
              Upload a Course
            </button>
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Explore Top Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
              <FontAwesomeIcon icon="fa-solid fa-code" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Web Development</h3>
              <p className="text-gray-500 text-sm text-center mt-1">Build websites and web applications.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
              <FontAwesomeIcon icon="fa-solid fa-mobile-screen" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700">App Development</h3>
              <p className="text-gray-500 text-sm text-center mt-1">Create mobile apps for iOS and Android.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-3">
              <FontAwesomeIcon icon="fa-solid fa-microchip" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Blockchain</h3>
              <p className="text-gray-500 text-sm text-center mt-1">Learn about cryptocurrencies and blockchain technology.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mb-3">
              <FontAwesomeIcon icon="fa-brands fa-python" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Python Automation</h3>
              <p className="text-gray-500 text-sm text-center mt-1">Automate tasks with Python scripting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses List Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Explore Our Courses</h2>
              <p className="text-gray-600 text-sm">Search for courses that interest you.</p>
            </div>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <FontAwesomeIcon icon="fa-brands fa-searchengin" />
              </div>
              <input
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative w-full h-48">
                  <Image
                    src={`/images/${course.image}`}
                    alt={course.ct}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.ct}</h3>
                  <p className="text-gray-500 text-sm mb-1">Uploaded by: {course.uploaded_by}</p>
                  <p className="text-gray-500 text-sm">Students: {course.skills}</p>
                  <button
                    onClick={() => {}} // Example dynamic route
                    className="mt-3 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 text-sm"
                  >
                    View Course
                  </button>
                </div>
              </div>
            ))}
            {courses.length === 0 && (
              <p className="text-gray-600 col-span-full text-center">No courses found matching your search.</p>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-20 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Expand Your Knowledge?</h2>
          <p className="text-lg mb-8">Share the joy of learning with your friends and help them discover a world of opportunities.</p>
          <button
            onClick={() => router.push('/courses')}
            className="bg-white text-purple-600 font-semibold py-3 px-6 rounded-full hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
          >
            Explore More Courses
          </button>
        </div>
        </section>
    </div>
  );
};

export default HomePage;
