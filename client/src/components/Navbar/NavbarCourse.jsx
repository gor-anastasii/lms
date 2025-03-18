import React from 'react';
import { svgIconDone, svgIconNow, svgIconSoon } from '../../utils/svgIcons';

const NavbarCourse = () => {
  return (
    <>
      <nav className="nav-course">
        <div className="course-progress">
          <h2>Full Stack Project w/ Next.js 15 & React 19</h2>

          <div className="progress-bar">
            <div></div>
          </div>

          <p>25% Пройдено</p>
        </div>
        <ul>
          <li className="done-part">
            {svgIconDone()}
            <span>Раздел 1</span>
          </li>
          <li className="active-nav">
            {svgIconNow()}
            <span>Раздел 2</span>
          </li>
          <li>
            {svgIconSoon()}
            <span>Раздел 3</span>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavbarCourse;
