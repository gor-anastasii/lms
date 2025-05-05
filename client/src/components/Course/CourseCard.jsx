import React from 'react';
import { useNavigate } from 'react-router';
import { svgIconImg, svgIconStart } from '../../utils/svgIcons';

const CourseCard = ({ id, title, imageUrl, topic, averageRating, progress, partsCount }) => {
  const navigate = useNavigate();
  const getPartsCountText = (count) => {
    if (count === 1) {
      return `${count} часть`;
    } else if (count >= 2 && count <= 4) {
      return `${count} части`;
    } else {
      return `${count} частей`;
    }
  };

  return (
    <div className="course-card" onClick={() => navigate(`/course/${id}`)}>
      {imageUrl ? (
        <img src={imageUrl} alt="course-preview" />
      ) : (
        <div className="not-image">{svgIconImg()}</div>
      )}

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
            <span>{getPartsCountText(partsCount)}</span>
          </div>
          <div className="course-card-rating">
            {svgIconStart()}

            <span>{averageRating.toFixed(1)}</span>
          </div>
        </div>
        {progress !== null ? (
          <div className="course-card-progress">
            <div className="progress-bar">
              <div style={{ width: `${progress}%` }}></div>
            </div>
            <span>{progress}% Пройдено</span>
          </div>
        ) : (
          <span className="not-progress">Подробнее ...</span>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
