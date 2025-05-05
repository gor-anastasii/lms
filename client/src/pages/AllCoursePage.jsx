import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Navbar from '../components/Navbar/Navbar.jsx';
import Sortbar from '../components/Sortbar';
import CourseCard from '../components/Course/CourseCard';
import SkeletonCourse from '../components/Course/SkeletonCourse';
import Header from '../components/Header/Header';

import {
  loadCourses,
  setCurrentPageStore,
  setFilterTopic,
  setSearchQuery,
} from '../redux/slices/courseSlice.js';
import { fetchTotalProgress } from '../redux/slices/progressSlice.js';
import {
  svgIconFirstPage,
  svgIconLastPage,
  svgIconNextPage,
  svgIconPrevPage,
} from '../utils/svgIcons.js';

const AllCoursePage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courses = [], status, currentPage, totalPages } = useSelector((state) => state.courses);

  React.useEffect(() => {
    dispatch(setFilterTopic('Все'));
    dispatch(setSearchQuery(''));
    dispatch(setCurrentPageStore(currentPage));
    dispatch(loadCourses({ userData: token, page: currentPage }));
    dispatch(fetchTotalProgress(token));
  }, [dispatch, token, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPageStore(page));
      dispatch(loadCourses({ userData: token, page }));
    }
  };

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
              courses.map((course) => {
                const progress =
                  course.Progresses && course.Progresses.length > 0
                    ? course.Progresses[0].progress
                    : null;

                return (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    topic={course.topic}
                    imageUrl={course.imageUrl}
                    averageRating={course.averageRating}
                    partsCount={course.CourseParts?.length || 0}
                    progress={progress}
                  />
                );
              })}
          </div>

          {courses.length !== 0 && (
            <div className="pagination-block">
              <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                {svgIconFirstPage()}
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}>
                {svgIconPrevPage()}
              </button>
              <span>
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}>
                {svgIconNextPage()}
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}>
                {svgIconLastPage()}
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default AllCoursePage;
