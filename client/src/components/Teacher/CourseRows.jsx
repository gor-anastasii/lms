import React from 'react';
import { svgIconEdit } from '../../utils/svgIcons';
import { useNavigate } from 'react-router';

const CourseRows = ({ teacherCourse }) => {
  const navigator = useNavigate();

  const sortedCourses = [...teacherCourse].sort((a, b) => {
    const statusA = a.status === 'активный' ? 0 : 1;
    const statusB = b.status === 'активный' ? 0 : 1;

    if (statusA !== statusB) {
      return statusA - statusB;
    }

    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  return (
    <div className="teacher-table-content">
      {sortedCourses.length === 0 ? (
        <div className="no-courses-message">
          <span>Курсов пока нет</span>
        </div>
      ) : (
        sortedCourses.map((course, index) => (
          <div className="table-content-row" key={index}>
            <div className="table-content-cell">
              <div className="cell-title">
                <span>{course.title}</span>
              </div>
            </div>
            <div className="table-content-cell">
              <div className="cell-price">
                <span>Бесплатно</span>
              </div>
            </div>
            <div className="table-content-cell">
              <div className="cell-publish">
                <span>{course.published}</span>
              </div>
            </div>
            <div className="table-content-cell">
              <div className="cell-public">
                <span>{course.status}</span>
              </div>
            </div>
            <div className="table-content-cell">
              <div
                className="editCourseBtn"
                onClick={() => navigator(`/teacher-mode/course/${course.id}`)}>
                {svgIconEdit()}
                <span>Edit</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseRows;
