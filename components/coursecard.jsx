import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 text-white">
      <img className="w-full h-48 object-cover" src={`/images/${course.image}`} alt={course.ct} />
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{course.ct}</h2>
        <p className="text-gray-400">Uploaded by: {course.uploaded_by}</p>
        <p className="text-gray-400">Students Enrolled: {course.total_students}</p>
      </div>
      <div className="px-4 pb-4">
        <a href={`/course/admin/${course._id}`} className="block bg-blue-600 text-center text-white font-semibold py-2 rounded hover:bg-blue-500 transition duration-300">
          Update Course
        </a>
      </div>
    </div>
  );
};

export default CourseCard;