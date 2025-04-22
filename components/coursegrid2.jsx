import React from 'react';
import CourseCard from './coursecard2';

const CoursesGrid2 = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {courses.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </div>
  );
};

export default CoursesGrid2;