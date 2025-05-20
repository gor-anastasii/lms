import React from 'react';
import { svgIconEdit, svgIconGarbage } from '../../../utils/svgIcons';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { updateTeachernameAdmin } from '../../../api/authApi';

const TeacherRows = ({ teachers, openPopup, onNameChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [editTeacherId, setEditTeacherId] = React.useState(null);
  const [editedName, setEditedName] = React.useState('');
  const [editInputVisible, setEditInputVisible] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleEditClick = (teacherId, currentName) => {
    if (editInputVisible) {
      setEditInputVisible(false);
    } else {
      setEditInputVisible(true);
      setEditTeacherId(teacherId);
      setEditedName(currentName);
      setError('');
    }
  };

  const handleSaveClick = async (teacherId) => {
    const trimmedName = editedName.trim();

    if (trimmedName.length < 3 || trimmedName.length > 12) {
      setError('Неверное имя пользователя');
      return;
    }

    if (!trimmedName) {
      setError('Имя не может быть пустым');
      return;
    }

    await updateTeachernameAdmin(token, editedName, teacherId);
    setEditTeacherId(null);
    setError('');
    onNameChange();
  };

  return (
    <div className="admin-table-content">
      {teachers.length === 0 ? (
        <div className="no-courses-message">
          <span>Учителей пока нет</span>
        </div>
      ) : (
        teachers.map((teacher, index) => (
          <div className="table-content-row" key={index}>
            <div className="table-content-cell">
              <div className="cell-user-img">
                <img
                  src={teacher.imageUrl}
                  alt={teacher.username}
                  style={{
                    width: '48px',
                    height: '48px',
                    border: 'none',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
            <div className="table-content-cell">
              <div className="cell-name">
                {editInputVisible && editTeacherId === teacher.id ? (
                  <div className="edit-name-admin">
                    <div>
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                      <div className="editCourseBtn" onClick={() => handleSaveClick(teacher.id)}>
                        <span>Save</span>
                      </div>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                  </div>
                ) : (
                  <span>{teacher.username}</span>
                )}
              </div>
            </div>
            <div className="table-content-cell">
              <div className="cell-email">
                <span>{teacher.email}</span>
              </div>
            </div>
            <div className="table-content-cell">
              <div className="cell-count">
                <span>{teacher.courseCount}</span>
              </div>
            </div>
            <div className="table-content-cell">
              <div
                className="editCourseBtn"
                onClick={() => handleEditClick(teacher.id, teacher.username)}>
                {svgIconEdit()}
                <span>Edit</span>
              </div>
              <div className="editCourseBtn" onClick={() => openPopup(teacher.id)}>
                {svgIconGarbage()}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TeacherRows;
