import React from 'react';
import { svgIconEdit, svgIconPlus, svgIconSort } from '../../utils/svgIcons';
import { useNavigate } from 'react-router';

const TeacherCourse = () => {
  const navigator = useNavigate();
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

        <div className="teacher-table-content">
          <div className="table-content-row">
            <div className="table-content-cell">
              <div className="cell-title">
                <span>FullStack Course</span>
              </div>
            </div>
            <div className="table-content-cell">
              <div className="cell-price">
                <span>Free</span>
              </div>
            </div>
            <div className="table-content-cell">
              <div className="cell-publish">
                <span>Draft</span>
              </div>
            </div>
            <div className="table-content-cell">
              <div className="cell-public">
                <span>Public</span>
              </div>
            </div>
            <div className="table-content-cell">
              <div className="editCourseBtn">
                {svgIconEdit()}
                <span>Edit</span>
              </div>
            </div>
          </div>

          <div className="table-content-row">
            <div className="table-content-cell">
              <div className="cell-title">
                <span>FullStack Course</span>
              </div>
            </div>
            <div className="table-content-cell">
              <div className="cell-price">
                <span>Free</span>
              </div>
            </div>
            <div className="table-content-cell">
              <div className="cell-publish">
                <span>Draft</span>
              </div>
            </div>
            <div className="table-content-cell">
              <div className="cell-public">
                <span>Public</span>
              </div>
            </div>
            <div className="table-content-cell">
              <div className="editCourseBtn">
                {svgIconEdit()}
                <span>Edit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCourse;
