import React from 'react';
import { useNavigate } from 'react-router';

const CourseCard = ({ id, title, imageUrl, topic, averageRating }) => {
  const navigate = useNavigate();

  return (
    <div className="course-card" onClick={() => navigate(`/course/${id}`)}>
      <img src={imageUrl} alt="course-preview" />

      <div className="course-card-info">
        <p>{title}</p>
        <span className="course-card-topic">{topic}</span>

        <div className="course-parts-rating">
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
          <div className="course-card-rating">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.99984 14.275L4.84984 16.775C4.66651 16.8917 4.47484 16.9417 4.27484 16.925C4.07484 16.9083 3.89984 16.8417 3.74984 16.725C3.59984 16.6083 3.48317 16.4627 3.39984 16.288C3.31651 16.1133 3.29984 15.9173 3.34984 15.7L4.44984 10.975L0.774841 7.80001C0.608174 7.65001 0.504174 7.47901 0.462841 7.28701C0.421507 7.09501 0.433841 6.90768 0.499841 6.72501C0.565841 6.54235 0.665841 6.39235 0.799841 6.27501C0.933841 6.15768 1.11717 6.08268 1.34984 6.05001L6.19984 5.62501L8.07484 1.17501C8.15817 0.975012 8.28751 0.825012 8.46284 0.725012C8.63817 0.625012 8.81717 0.575012 8.99984 0.575012C9.18251 0.575012 9.36151 0.625012 9.53684 0.725012C9.71217 0.825012 9.84151 0.975012 9.92484 1.17501L11.7998 5.62501L16.6498 6.05001C16.8832 6.08335 17.0665 6.15835 17.1998 6.27501C17.3332 6.39168 17.4332 6.54168 17.4998 6.72501C17.5665 6.90835 17.5792 7.09601 17.5378 7.28801C17.4965 7.48001 17.3922 7.65068 17.2248 7.80001L13.5498 10.975L14.6498 15.7C14.6998 15.9167 14.6832 16.1127 14.5998 16.288C14.5165 16.4633 14.3998 16.609 14.2498 16.725C14.0998 16.841 13.9248 16.9077 13.7248 16.925C13.5248 16.9423 13.3332 16.8923 13.1498 16.775L8.99984 14.275Z"
                fill="#FFD534"
              />
            </svg>

            <span>{averageRating}</span>
          </div>
        </div>
        <div className="course-card-price">
          <span>Бесплатно</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
