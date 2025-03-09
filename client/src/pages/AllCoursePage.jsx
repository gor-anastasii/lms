import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Navbar from '../components/Navbar';
import Sortbar from '../components/Sortbar';
import CourseCard from '../components/Course/CourseCard';
import SkeletonCourse from '../components/Course/SkeletonCourse';
import Header from '../components/Header/Header';

import { loadCourses } from '../redux/slices/courseSlice.js';

const AllCoursePage = () => {
  const dispatch = useDispatch();
  const { courses, status, error } = useSelector((state) => state.courses);

  React.useEffect(() => {
    dispatch(loadCourses());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main>
        <Navbar />

        <div className="content">
          <Sortbar />
          <div className="course-cards">
            {status === 'loading' && [...Array(8)].map((item) => <SkeletonCourse />)}
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
                />
              ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default AllCoursePage;
