import React from 'react';
import {
  svgIconFirstPage,
  svgIconLastPage,
  svgIconNextPage,
  svgIconPrevPage,
} from '../../../utils/svgIcons';
import TeacherRows from './TeacherRows';
import { deleteTeacherAdmin, getAllTeachers } from '../../../api/authApi';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import TeacherDelPopup from './TeacherDelPopup';

const AdminTeacherTable = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [teachers, setTeachers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [isDelPopupVisible, setIsDelPopupVisible] = React.useState(false);
  const [teacherId, setTeacherId] = React.useState(null);

  const loadTeachers = async (page = 1, searchValue = '') => {
    if (page < 1 || page > totalPages) return;

    setLoading(true);
    try {
      const fetchedData = await getAllTeachers(page, searchValue, token);
      if (fetchedData.teachers.length === 0 && searchValue !== '') {
        setTeachers([]);
        setTotalPages(1);
      } else {
        setTeachers(fetchedData.teachers);
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
    loadTeachers(currentPage, search);
  }, [currentPage, search]);

  React.useEffect(() => {
    if (search !== '') {
      loadTeachers(1, search);
    } else {
      loadTeachers(1, '');
    }
  }, [search]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value === '') {
      loadTeachers(1, '');
      setCurrentPage(1);
    } else {
      loadTeachers(1, value);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteTeacherAdmin(token, teacherId);
      setIsDelPopupVisible(false);
      await loadTeachers(currentPage, search);
    } catch (error) {
      console.error('Ошибка при удалении аккаунта:', error);
    }
  };

  const handleOpenPopup = (teacherId) => {
    setIsDelPopupVisible(true);
    setTeacherId(teacherId);
  };

  const handleNameChange = async () => {
    await loadTeachers(currentPage, search);
  };

  return (
    <>
      <section className="teacher-table-section">
        <h3>Учителя платформы</h3>

        <div className="section-search">
          <input
            type="text"
            placeholder="Поиск учителя"
            value={search}
            onChange={handleSearchChange}
          />
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
                <span>Имя</span>
              </div>
            </div>
            <div className="table-header-btn">
              <div>
                <span>Почта</span>
              </div>
            </div>
            <div className="table-header-btn">
              <div>
                <span>Курсы</span>
              </div>
            </div>
          </div>

          {loading && (
            <div className="loading">
              <ClipLoader color="#cb91d9" loading={true} size={50} />
            </div>
          )}
          {!loading && (
            <TeacherRows
              teachers={teachers || []}
              openPopup={handleOpenPopup}
              onNameChange={handleNameChange}
            />
          )}
        </div>

        <div className="pagination-block">
          <button onClick={() => loadTeachers(1, search)} disabled={currentPage === 1}>
            {svgIconFirstPage()}
          </button>
          <button
            onClick={() => loadTeachers(currentPage - 1, search)}
            disabled={currentPage === 1}>
            {svgIconPrevPage()}
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => loadTeachers(currentPage + 1, search)}
            disabled={currentPage === totalPages}>
            {svgIconNextPage()}
          </button>
          <button
            onClick={() => loadTeachers(totalPages, search)}
            disabled={currentPage === totalPages}>
            {svgIconLastPage()}
          </button>
        </div>
      </section>
      {isDelPopupVisible && (
        <TeacherDelPopup
          onDelete={handleDeleteUser}
          active={isDelPopupVisible}
          onClose={() => setIsDelPopupVisible(false)}
        />
      )}{' '}
    </>
  );
};

export default AdminTeacherTable;
