import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import CourseCard from '../components/Course/CourseCard';
import SkeletonCourse from '../components/Course/SkeletonCourse';
import { loadCourses } from '../redux/slices/courseSlice';

const MyProgressPage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courses, status } = useSelector((state) => state.courses);

  const [inProcess, setInProcess] = React.useState(0);
  const [done, setDone] = React.useState(0);
  const [yourCourses, setYourCourses] = React.useState(courses);
  const [activeDone, setActiveDone] = React.useState(false);
  const [activeProcess, setActiveProcess] = React.useState(false);

  React.useEffect(() => {
    dispatch(loadCourses(token)).then(() => {
      const inProcessCount = courses.filter(
        (course) => course.progress >= 0 && course.progress < 100 && course.progress !== null,
      ).length;
      const doneCount = courses.filter((course) => course.progress === 100).length;

      filterInProcess();
      setInProcess(inProcessCount);
      setDone(doneCount);
    });
  }, [dispatch, token]);

  const filterInProcess = () => {
    setActiveProcess(true);
    setActiveDone(false);
    const inProcessCourses = courses.filter(
      (course) => course.progress >= 0 && course.progress < 100 && course.progress !== null,
    );
    setYourCourses(inProcessCourses);
  };

  const filterDone = () => {
    setActiveProcess(false);
    setActiveDone(true);
    const doneCourses = courses.filter((course) => course.progress === 100);
    setYourCourses(doneCourses);
  };

  return (
    <>
      <Header />
      <main>
        <Navbar i={1} />

        <div className="content">
          <div className="progress-page">
            <div className="sortbar-progress">
              <div
                className={`sortbar-progress-btn ${activeProcess ? 'active-btn' : ''}`}
                onClick={filterInProcess}>
                <div
                  className="progress-btn-icon"
                  style={{ backgroundColor: '#E2ECFE', color: '#3B65DE' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-clock text-blue-700/85 dark:text-blue-400 h-8 w-8">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="progress-title">
                  <p>В процессе</p>
                  <span>{inProcess} курс</span>
                </div>
              </div>

              <div
                className={`sortbar-progress-btn ${activeDone ? 'active-btn' : ''}`}
                onClick={filterDone}>
                <div
                  className="progress-btn-icon"
                  style={{ backgroundColor: '#D1FAE5', color: '#047857' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-circle-check-big text-emerald-700 dark:text-emerald-100 h-8 w-8">
                    <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                    <path d="m9 11 3 3L22 4"></path>
                  </svg>
                </div>
                <div className="progress-title">
                  <p>Завершено</p>
                  <span>{done} курс</span>
                </div>
              </div>
            </div>

            <div className="course-cards">
              {status === 'loading' && [...Array(4)].map((item, i) => <SkeletonCourse key={i} />)}
              {(status === 'failed' || yourCourses.length < 1) && (
                <div className="notfoundcourse">
                  <p>Вы пока не начали обучение.</p>
                </div>
              )}
              {status === 'succeeded' &&
                yourCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    topic={course.topic}
                    imageUrl={course.imageUrl}
                    averageRating={course.averageRating}
                    progress={course.progress}
                  />
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MyProgressPage;
