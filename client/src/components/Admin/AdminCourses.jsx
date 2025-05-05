import React from 'react';
import { ClipLoader } from 'react-spinners';
import {
  svgIconFirstPage,
  svgIconLastPage,
  svgIconNextPage,
  svgIconPrevPage,
} from '../../utils/svgIcons';
import CourseRows from './components/CourseRows';
import { fetchAllCoursesForAdmin } from '../../api/courseApi';
import { useSelector } from 'react-redux';

const AdminCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [search, setSearch] = React.useState('');

  const loadCourses = async (page = 1, searchValue = search) => {
    if (page < 1 || page > totalPages) return;

    setLoading(true);
    try {
      const fetchedData = await fetchAllCoursesForAdmin(page, token, searchValue);
      if (fetchedData.courses.length === 0 && searchValue !== '') {
        setCourses([]);
        setTotalPages(1);
      } else {
        setCourses(fetchedData.courses);
        setTotalPages(fetchedData.totalPages);
      }
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadCourses(currentPage, search);
  }, [currentPage, search]);

  React.useEffect(() => {
    if (search !== '') {
      loadCourses(1, search);
    } else {
      loadCourses(1, '');
    }
  }, [search]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value === '') {
      loadCourses(1, '');
      setCurrentPage(1);
    } else {
      loadCourses(1, value);
    }
  };

  return (
    <div className="adminCourse-container">
      <h1>Управление курсами платформы</h1>

      <div className="section-search">
        <input type="text" placeholder="Поиск курса" value={search} onChange={handleSearchChange} />
      </div>

      <div className="admin-teacher-table">
        <div className="admin-table-header">
          <div className="table-header-btn">
            <div>
              <span>Фото</span>
            </div>
          </div>
          <div className="table-header-btn">
            <div>
              <span>Название</span>
            </div>
          </div>
          <div className="table-header-btn">
            <div>
              <span>Рейтинг</span>
            </div>
          </div>
          <div className="table-header-btn">
            <div>
              <span>Подписчики</span>
            </div>
          </div>
        </div>

        {loading && (
          <div className="loading">
            <ClipLoader color="#cb91d9" loading={true} size={50} />
          </div>
        )}
        {!loading && (
          <CourseRows
            courses={courses || []}
            refreshCourses={() => loadCourses(currentPage, search)}
          />
        )}
      </div>

      <div className="pagination-block">
        <button onClick={() => loadCourses(1)} disabled={currentPage === 1}>
          {svgIconFirstPage()}
        </button>
        <button onClick={() => loadCourses(currentPage - 1)} disabled={currentPage === 1}>
          {svgIconPrevPage()}
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button onClick={() => loadCourses(currentPage + 1)} disabled={currentPage === totalPages}>
          {svgIconNextPage()}
        </button>
        <button onClick={() => loadCourses(totalPages)} disabled={currentPage === totalPages}>
          {svgIconLastPage()}
        </button>
      </div>
    </div>
  );
};

export default AdminCourses;
