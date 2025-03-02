import React from 'react';
import { Link, useLocation } from 'react-router';
import HeaderPopup from './HeaderPopup';

const Header = () => {
  const [activePopup, setActivePopup] = React.useState(false);
  const [activeInput, setActiveInput] = React.useState(false);
  const location = useLocation();

  const isAuth = ['/auth/signin', '/auth/signup'].includes(location.pathname);
  const isInputHere = /^\/course\/\d+$/.test(location.pathname);
  return (
    <header>
      <Link to="/" className="logo">
        <img src="/img/logo2.png" alt="logo" />
        <span>Learning</span>
      </Link>

      {!isAuth && (
        <div className="header-controls">
          {!isInputHere && (
            <div className={`header-input ${activeInput ? 'active-input' : ''}`}>
              <img src="/img/search.svg" alt="search" />
              <input
                type="text"
                placeholder="Искать курс..."
                onFocus={() => setActiveInput(true)}
                onBlur={() => setActiveInput(false)}
              />
            </div>
          )}

          <button className="header-notify">
            <span></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-inbox h-5 w-5 font-medium">
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
              <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
            </svg>
          </button>

          <div className="header-user">
            <div
              onClick={() => setActivePopup((prev) => !prev)}
              className="header-user-img"
              style={{ backgroundImage: 'url(/img/user.jpg)' }}></div>

            <HeaderPopup activePopup={activePopup} closePopup={() => setActivePopup(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
