import React from 'react';
import { useNavigate } from 'react-router';

const CourseCard = ({ id }) => {
  const navigate = useNavigate();

  return (
    <div className="course-card" onClick={() => navigate(`/course/${id}`)}>
      <img src="/img/images.jpg" alt="course-preview" />

      <div className="course-card-info">
        <p>Full Stack Project</p>
        <span className="course-card-topic">Computer Science</span>

        <div className="course-card-parts">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-book-open text-blue-700/85 dark:text-blue-400 h-3 w-3">
              <path d="M12 7v14"></path>
              <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
            </svg>
          </div>
          <span>10 частей</span>
        </div>
        <div className="course-card-price">
          <span>Бесплатно</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
