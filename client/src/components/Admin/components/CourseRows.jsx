import React from 'react';
import { useNavigate } from 'react-router';
import { svgIconImg, svgIconStart } from '../../../utils/svgIcons';
import { blockedCourseStatusByAdmin } from '../../../api/courseApi';
import { useSelector } from 'react-redux';

const CourseRows = ({ courses, refreshCourses }) => {
  const navigator = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleToggleStatus = async (e, courseId) => {
    e.stopPropagation();
    try {
      await blockedCourseStatusByAdmin(courseId, token);
      console.log('Статус курса успешно изменён');
      if (refreshCourses) refreshCourses();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="admin-table-content">
      {courses.length === 0 ? (
        <div className="no-courses-message">
          <span>Курсов пока нет</span>
        </div>
      ) : (
        courses.map((course, index) => (
          <div
            className="table-content-row"
            key={index}
            onClick={() => navigator(`/course/${course.id}`)}>
            <div className="table-content-cell">
              <div className="cell-img">
                {course.imageUrl ? (
                  <img src={course.imageUrl} alt="course-preview" />
                ) : (
                  <div className="not-image">{svgIconImg()}</div>
                )}
              </div>
            </div>
            <div className="table-content-cell">
              <div className="cell-title">
                <span>{course.title}</span>
              </div>
            </div>
            <div className="table-content-cell">
              <div className="cell-rating">
                {svgIconStart()}
                <span>{course.averageRating.toFixed(1)}</span>
              </div>
            </div>
            <div className="table-content-cell">
              <div className="cell-count">
                <span>{course.subscriberCount}</span>
              </div>
            </div>
            <div className="table-content-cell">
              <div
                className={course.published === 'blocked' ? 'blocked-btn' : 'editCourseBtn'}
                onClick={(e) => handleToggleStatus(e, course.id)}>
                <span>{course.published === 'blocked' ? 'Разблокировать' : 'Заблокировать'}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseRows;
