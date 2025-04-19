import React from 'react';
import { ClipLoader } from 'react-spinners';
import {
  svgIconFirstPage,
  svgIconLastPage,
  svgIconNextPage,
  svgIconPlus,
  svgIconPrevPage,
  svgIconSort,
} from '../../utils/svgIcons';
import NotFoundPage from '../../pages/NotFoundPage';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import CourseRows from './CourseRows';
import { loadTeacherCourses } from '../../redux/slices/teacherCourseSlice';

const TeacherCourse = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courses, status } = useSelector((state) => state.teacherCourses);

  React.useEffect(() => {
    dispatch(loadTeacherCourses(token));
  }, []);

  if (status === 'loading') {
    return (
      <div className="loading">
        <ClipLoader color="#cb91d9" loading={true} size={50} />
      </div>
    );
  }

  return (
    <div className="teacherPage-container">
      <h1>Курсы</h1>
      <div className="teacherPage-btns">
        <input type="text" placeholder="Искать курс" />
        <button className="teacherAddCourse" onClick={() => navigator('/teacher-mode/create')}>
          {svgIconPlus()}
          <span>Новый курс</span>
        </button>
      </div>

      <div className="teacher-courses-table">
        <div className="teacher-table-header">
          <div className="table-header-btn">
            <div>
              <span>Title</span>
              {svgIconSort()}
            </div>
          </div>
          <div className="table-header-btn">
            <div>
              <span>Price</span>
              {svgIconSort()}
            </div>
          </div>
          <div className="table-header-btn">
            <div>
              <span>Published</span>
              {svgIconSort()}
            </div>
          </div>
          <div className="table-header-btn">
            <div>
              <span>Type</span>
              {svgIconSort()}
            </div>
          </div>
        </div>

        <CourseRows teacherCourse={courses} />
      </div>

      <div className="pagination-block">
        <button className="first-page">{svgIconFirstPage()}</button>
        <button className="prev-page">{svgIconPrevPage()}</button>

        <span>1/2</span>

        <button className="next-page">{svgIconNextPage()}</button>
        <button className="last-page">{svgIconLastPage()}</button>
      </div>
    </div>
  );
};

export default TeacherCourse;
