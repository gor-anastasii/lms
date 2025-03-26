import React from 'react';

const NavbarTeacher = () => {
  return (
    <nav>
      <ul>
        <li className="active-nav">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-list h-5 w-5 text-primary font-medium animate-spin-once">
            <line x1="8" x2="21" y1="6" y2="6"></line>
            <line x1="8" x2="21" y1="12" y2="12"></line>
            <line x1="8" x2="21" y1="18" y2="18"></line>
            <line x1="3" x2="3.01" y1="6" y2="6"></line>
            <line x1="3" x2="3.01" y1="12" y2="12"></line>
            <line x1="3" x2="3.01" y1="18" y2="18"></line>
          </svg>
          <span>Курсы</span>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-chart-column-increasing h-5 w-5 font-medium">
            <path d="M13 17V9"></path>
            <path d="M18 17V5"></path>
            <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
            <path d="M8 17v-3"></path>
          </svg>
          <span>Аналитика</span>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarTeacher;
