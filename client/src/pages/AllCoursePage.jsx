import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Navbar from '../components/Navbar/Navbar.jsx';
import Sortbar from '../components/Sortbar';
import CourseCard from '../components/Course/CourseCard';
import SkeletonCourse from '../components/Course/SkeletonCourse';
import Header from '../components/Header/Header';

import { loadCourses } from '../redux/slices/courseSlice.js';
import { fetchTotalProgress } from '../redux/slices/progressSlice.js';

const AllCoursePage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courses, status } = useSelector((state) => state.courses);

  React.useEffect(() => {
    dispatch(loadCourses(token));
    dispatch(fetchTotalProgress(token));
  }, [dispatch, token]);

  return (
    <>
      <Header />
      <main>
        <Navbar i={0} />

        <div className="content">
          <Sortbar />
          <div className="course-cards">
            {status === 'loading' && [...Array(8)].map((item, i) => <SkeletonCourse key={i} />)}
            {(status === 'failed' || courses.length < 1) && (
              <div className="notfoundcourse">
                <p>Курсы не найдены</p>
              </div>
            )}
            {status === 'succeeded' &&
              courses.map((course) => (
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
      </main>
    </>
  );
};

export default AllCoursePage;
