import React from 'react';
import { useLocation, useNavigate } from 'react-router';

const NavbarAdmin = () => {
  const navigator = useNavigate();
  const location = useLocation();
  return (
    <nav>
      <ul>
        <li
          className={location.pathname === '/admin-mode' ? 'active-nav' : ''}
          onClick={() => navigator('/admin-mode')}>
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
            className="lucide lucide-user h-5 w-5 text-primary font-medium">
            <path d="M20 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M4 21v-2a4 4 0 0 1 3-3.87"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Учителя</span>
        </li>
        <li
          className={location.pathname === '/admin-mode/courses' ? 'active-nav' : ''}
          onClick={() => navigator('/admin-mode/courses')}>
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
      </ul>
    </nav>
  );
};

export default NavbarAdmin;
