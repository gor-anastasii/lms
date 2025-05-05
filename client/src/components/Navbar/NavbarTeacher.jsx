import React from 'react';
import { useLocation, useNavigate } from 'react-router';

const NavbarTeacher = () => {
  const navigator = useNavigate();
  const location = useLocation();

  return (
    <nav>
      <ul>
        <li
          className={
            location.pathname === '/teacher-mode' || location.pathname === '/teacher-mode/'
              ? 'active-nav'
              : ''
          }
          onClick={() => navigator('/teacher-mode/')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-list h-5 w-5 text-primary font-medium animate-spin-once">
            <line x1="8" x2="21" y1="6" y2="6"></line>
            <line x1="8" x2="21" y1="12" y2="12"></line>
            <line x1="8" x2="21" y1="18" y2="18"></line>
            <line x1="3" x2="3.01" y1="6" y2="6"></line>
            <line x1="3" x2="3.01" y1="12" y2="12"></line>
            <line x1="3" x2="3.01" y1="18" y2="18"></line>
          </svg>
          <span>Курсы</span>
        </li>
        <li
          className={location.pathname === '/teacher-mode/analytics' ? 'active-nav' : ''}
          onClick={() => navigator('/teacher-mode/analytics')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chart-column-increasing h-5 w-5 font-medium">
            <path d="M13 17V9"></path>
            <path d="M18 17V5"></path>
            <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
            <path d="M8 17v-3"></path>
          </svg>
          <span>Статистика</span>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarTeacher;
