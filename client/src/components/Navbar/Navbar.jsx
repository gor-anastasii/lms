import React from 'react';
import { useNavigate } from 'react-router';

const Navbar = ({ i }) => {
  const navigator = useNavigate();
  return (
    <nav>
      <ul>
        <li onClick={() => navigator('/')} className={`${i === 0 ? 'active-nav' : ''}`}>
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
            className="lucide lucide-compass h-5 w-5 text-primary font-medium animate-spin-once">
            <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"></path>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
          <span>Обзор курсов</span>
        </li>
        <li onClick={() => navigator('/my-progress')} className={`${i === 1 ? 'active-nav' : ''}`}>
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
            className="lucide lucide-pencil-ruler text-muted-foreground h-5 w-5 mr-2">
            <path d="m15 5 4 4"></path>
            <path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"></path>
            <path d="m8 6 2-2"></path>
            <path d="m2 22 5.5-1.5L21.17 6.83a2.82 2.82 0 0 0-4-4L3.5 16.5Z"></path>
            <path d="m18 16 2-2"></path>
            <path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17"></path>
          </svg>
          <span>Мой прогресс</span>
        </li>
        <li className={`${i === 3 ? 'active-nav' : ''}`}>
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
            className="lucide lucide-crown h-5 w-5 font-medium">
            <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path>
            <path d="M5 21h14"></path>
          </svg>
          <span>Таблица лидеров</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
