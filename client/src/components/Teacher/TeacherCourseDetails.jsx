import React from 'react';

const TeacherCourseDetails = () => {
  return (
    <div className="course-details-components">
      <button className="course-details-exit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-left h-4 w-4 mr-2">
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </svg>
        <span>Назад к курсам</span>
      </button>

      <div className="course-details-container"></div>
    </div>
  );
};

export default TeacherCourseDetails;
