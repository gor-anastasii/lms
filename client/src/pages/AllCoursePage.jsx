import React from 'react';

import Navbar from '../components/Navbar';
import Sortbar from '../components/Sortbar';
import CourseCard from '../components/Course/CourseCard';

const AllCoursePage = () => {
  return (
    <>
      <Navbar />

      <div className="content">
        <Sortbar />
        <div className="course-cards">
          {[...Array(10)].map((item, i) => {
            return <CourseCard id={i} />;
          })}
        </div>
      </div>
    </>
  );
};

export default AllCoursePage;
