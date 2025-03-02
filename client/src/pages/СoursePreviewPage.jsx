import React from 'react';
import { useNavigate } from 'react-router';

import Navbar from '../components/Navbar';

const CoursePreviewPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="content">
        <button onClick={() => navigate('/')} className="course-preview-exit">
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

        <div className="course-content">
          <div className="course-info">
            <img src="/img/img-course.jpg" alt="course-img" />

            <div className="course-info-block">
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

              <h3>Full Stack Project</h3>
              <p>
                QMM/Quality Motion Music offers exclusive extended tracks and remixes by The Weeknd.
                Immerse yourself in the deep, atmospheric soundscapes of your favorite songs and
                discover new dimensions of music.
              </p>

              <div className="course-info-tags">
                <div className="course-tag">
                  <span>NodeJs</span>
                </div>
                <div className="course-tag">
                  <span>React</span>
                </div>
                <div className="course-tag">
                  <span>MERN</span>
                </div>
              </div>

              <div className="course-topic">
                <span>Computer Science</span>
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
                  <span>Автор курса Test Teacher</span>
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

                  <span>Последнее обновление от 14 февраля, 2025</span>
                </div>
              </div>

              <div className="course-card-price">
                <span>Бесплатно</span>
              </div>
            </div>
          </div>

          <div className="course-payment">
            <h4>Готовы начать обучение?</h4>
            <p>Отслеживайте свой прогресс, учите новое и жизнь станет лучше!</p>

            <div className="course-payment-btn free-btn">
              <span>Присоединиться бесплатно</span>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePreviewPage;
