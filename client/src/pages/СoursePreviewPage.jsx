import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import Navbar from '../components/Navbar/Navbar';
import CoursePreview from '../components/CoursePreview/CoursePreview';
import Header from '../components/Header/Header';
import NotFoundPage from './NotFoundPage';
import { svgIconStart } from '../utils/svgIcons';

import { fetchReviews } from '../redux/slices/reviewSlice';
import { subscribeToCourse } from '../api/progressApi';

const CoursePreviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoad, setIsLoad] = React.useState(false);

  const { token } = useSelector((state) => state.auth);
  const { reviews, status } = useSelector((state) => state.review);
  const { courses } = useSelector((state) => state.courses);
  const currentCourse = courses.find((course) => course.id === id);

  const handleSubscribe = async () => {
    setIsLoad(true);
    try {
      if (currentCourse.progress === null) {
        await subscribeToCourse(token, id);
      }

      navigate(`/course/${id}/parts`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoad(false);
    }
  };

  React.useEffect(() => {
    dispatch(fetchReviews(id, token));
  }, [dispatch]);

  if (!currentCourse) {
    return <NotFoundPage />;
  }

  if (status === 'loading' || isLoad) {
    return (
      <div className="loading">
        <ClipLoader color="#cb91d9" loading={true} size={50} />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main>
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
              {console.log(currentCourse)}
              <CoursePreview
                title={currentCourse.title}
                description={currentCourse.description}
                topic={currentCourse.topic}
                imageUrl={currentCourse.imageUrl}
                tags={currentCourse.Tags}
                update={currentCourse.updatedAt}
                rating={currentCourse.averageRating}
                teacherName={currentCourse.User.username}
              />

              <div className="course-preview-comments">
                <div>
                  <h3>Отзывы</h3>
                  <p>Отзывы тех, кто уже прошел этот курс</p>
                </div>

                {(status === 'succeeded' || status === 'failed') && reviews.length === 0 && (
                  <p>Отзывов пока нет.</p>
                )}
                {status === 'succeeded' &&
                  reviews.length > 0 &&
                  reviews.map((review) => (
                    <div key={review.id} className="comment-block">
                      <div className="comment-user">
                        <h4>{review.username}</h4>
                        <div>
                          {svgIconStart()}
                          <span>{review.rating}</span>
                        </div>
                      </div>
                      <p>{review.comment}</p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="course-preview-aside">
              <div className="course-payment">
                <h4>Готовы начать обучение?</h4>
                <p>Отслеживайте свой прогресс, учите новое и жизнь станет лучше!</p>

                <div className="course-payment-btn free-btn" onClick={handleSubscribe}>
                  <span>
                    {currentCourse.progress === null
                      ? 'Присоединиться бесплатно'
                      : 'Продолжить обучение'}
                  </span>
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
        </div>
      </main>
    </>
  );
};

export default CoursePreviewPage;
