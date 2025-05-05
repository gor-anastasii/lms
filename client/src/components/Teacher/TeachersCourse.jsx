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
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import CourseRows from './CourseRows';
import { loadTeacherCourses } from '../../redux/slices/teacherCourseSlice';

const TeacherCourse = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courses, status, totalPages } = useSelector((state) => state.teacherCourses);

  const [search, setSearch] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setCurrentPage(1);
    dispatch(loadTeacherCourses({ tokenUser: token, page: 1, search: value }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      dispatch(loadTeacherCourses({ tokenUser: token, page: newPage, search }));
    }
  };

  React.useEffect(() => {
    dispatch(loadTeacherCourses({ tokenUser: token, page: currentPage, search }));
  }, []);

  return (
    <div className="teacherPage-container">
      <h1>Курсы</h1>
      <div className="teacherPage-btns">
        <input type="text" placeholder="Искать курс" value={search} onChange={handleSearchChange} />
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
            </div>
          </div>
          <div className="table-header-btn">
            <div>
              <span>Followers</span>
            </div>
          </div>
          <div className="table-header-btn">
            <div>
              <span>Published</span>
            </div>
          </div>
          <div className="table-header-btn">
            <div>
              <span>Type</span>
            </div>
          </div>
        </div>

        {status === 'loading' && (
          <div className="loading">
            <ClipLoader color="#cb91d9" loading={true} size={50} />
          </div>
        )}

        {status !== 'loading' && (
          <CourseRows teacherCourse={courses} currentPage={currentPage} search={search} />
        )}
      </div>

      {courses.length !== 0 && (
        <div className="pagination-block">
          <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
            {svgIconFirstPage()}
          </button>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
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
  );
};

export default TeacherCourse;
