import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../redux/slices/authSlice';

const HeaderPopup = ({ activePopup, closePopup }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { totalProgress } = useSelector((state) => state.progress);

  const onBtnClick = (route) => {
    if (route === '/auth/signin') {
      dispatch(logout());
    }
    navigate(route);
    closePopup();
  };

  return (
    <div className={`overlay ${activePopup ? 'overlay-active' : ''}`} onClick={closePopup}>
      <div className={`header-user-popup ${activePopup ? 'header-user-popup-active' : ''}`}>
        <div className="user-info">
          <p>{user.username}</p>
          <span className="role">{user.role}</span>
          <span сlassName="email">{user.email}</span>
        </div>

        {totalProgress !== null && (
          <div className="user-progress">
            <div className="user-progress-data">
              <span>Прогресс</span>
              <span>{totalProgress}/100</span>
            </div>
            <div className="user-progressbar">
              <div style={{ width: `${totalProgress}%` }}></div>
            </div>
          </div>
        )}

        <div className="header-user-buttons">
          {user.role === 'teacher' && (
            <button onClick={() => navigate('/teacher-mode')}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-book-marked h-4 w-4 mr-2">
                <path d="M10 2v8l3-3 3 3V2"></path>
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"></path>
              </svg>
              <span>Учитель</span>
            </button>
          )}

          <button onClick={() => navigate('/settings/general')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-settings2 mr-2 h-4 w-4">
              <path d="M20 7h-9"></path>
              <path d="M14 17H5"></path>
              <circle cx="17" cy="17" r="3"></circle>
              <circle cx="7" cy="7" r="3"></circle>
            </svg>
            <span>Настройки</span>
          </button>
        </div>
        <div className="exit">
          <button onClick={() => onBtnClick('/auth/signin')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-log-out mr-2 h-4 w-4">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" x2="9" y1="12" y2="12"></line>
            </svg>
            <span>Выйти</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderPopup;
