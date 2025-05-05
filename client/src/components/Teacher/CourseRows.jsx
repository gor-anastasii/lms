import React from 'react';
import { svgIconEdit } from '../../utils/svgIcons';
import { useNavigate } from 'react-router';

const CourseRows = ({ teacherCourse = [], currentPage, search }) => {
  const navigator = useNavigate();

  return (
    <div className="teacher-table-content">
      {teacherCourse.length === 0 ? (
        <div className="no-courses-message">
          <span>Курсов пока нет</span>
        </div>
      ) : (
        teacherCourse.map((course, index) => (
          <div
            className={`table-content-row ${course.published === 'blocked' ? 'blocked-row' : ''}`}
            key={index}>
            <div className="table-content-cell">
              <div className="cell-title">
                <span>{course.title}</span>
              </div>
            </div>
            <div className="table-content-cell">
              <div className="cell-price">
                <span>
                  {(course.published === 'published' || course.published === 'blocked') &&
                  course.subscriberCount !== null
                    ? `${course.subscriberCount}`
                    : '—'}
                </span>
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
                onClick={() =>
                  navigator(
                    `/teacher-mode/course/${course.id}?page=${currentPage}&search=${search}`,
                  )
                }>
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
