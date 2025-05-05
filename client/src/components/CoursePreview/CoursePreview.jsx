import React from 'react';
import { formatDate } from '../../utils/formatDate.js';
import { svgIconImg, svgIconStart } from '../../utils/svgIcons.js';

const CoursePreview = ({
  title,
  description,
  topic,
  imageUrl,
  tags,
  update,
  teacherName,
  rating,
}) => {
  return (
    <>
      {imageUrl ? (
        <img src={imageUrl} alt="course-img" />
      ) : (
        <div className="not-image">{svgIconImg()}</div>
      )}

      <div className="course-info-block">
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
            {svgIconStart()}

            <span>{rating.toFixed(1)}</span>
          </div>
        </div>

        <h3>{title}</h3>
        <p>{description}</p>

        {tags.length > 0 && (
          <div className="course-info-tags">
            {tags.map((tag) => {
              return (
                <div className="course-tag">
                  <span>{tag.name}</span>
                </div>
              );
            })}
          </div>
        )}

        <div className="course-topic">
          <span>{topic}</span>
        </div>

        <div className="course-generate">
          <div className="course-author">
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
              className="lucide lucide-book-a h-4 w-4">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"></path>
              <path d="m8 13 4-7 4 7"></path>
              <path d="M9.1 11h5.7"></path>
            </svg>
            <span>Автор курса {teacherName}</span>
          </div>

          <div className="course-last-update">
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
              className="lucide lucide-calendar-days h-4 w-4">
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
              <path d="M8 14h.01"></path>
              <path d="M12 14h.01"></path>
              <path d="M16 14h.01"></path>
              <path d="M8 18h.01"></path>
              <path d="M12 18h.01"></path>
              <path d="M16 18h.01"></path>
            </svg>

            <span>Последнее обновление от {formatDate(update)}</span>
          </div>
        </div>

        <div className="course-card-price">
          <span>Бесплатно</span>
        </div>
      </div>
    </>
  );
};

export default CoursePreview;
