import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import HeaderPopup from './HeaderPopup';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCoursesSearchFilter,
  loadCourses,
  setSearchQuery,
} from '../../redux/slices/courseSlice';

const Header = () => {
  const coursePath = /^\/course\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  const coursePartPath =
    /^\/course\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/parts$/;
  const [activePopup, setActivePopup] = React.useState(false);
  const [activeInput, setActiveInput] = React.useState(false);
  const [searchQuery, setSearchQueryInput] = React.useState('');

  const location = useLocation();
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { filterTopic } = useSelector((state) => state.courses);

  const isAuth = ['/auth/signin', '/auth/signup'].includes(location.pathname);
  const isNotInputHere = !(
    coursePath.test(location.pathname) ||
    coursePartPath.test(location.pathname) ||
    location.pathname.startsWith('/teacher-mode') ||
    ['/settings/general', '/my-progress'].includes(location.pathname)
  );

  const isBtnBack =
    coursePartPath.test(location.pathname) ||
    ['/settings/general'].includes(location.pathname) ||
    location.pathname.startsWith('/teacher-mode');

  const handleSearch = (event) => {
    const query = event.target.value.trim();
    setSearchQueryInput(query);
    dispatch(setSearchQuery(query));
    const fetchParams = { userData: token, query, topic: filterTopic };

    if (query) {
      dispatch(fetchCoursesSearchFilter(fetchParams));
    } else if (filterTopic) {
      dispatch(fetchCoursesSearchFilter({ ...fetchParams, query: '' }));
    } else {
      dispatch(loadCourses(token));
    }
  };

  return (
    <header>
      <Link to="/" className="logo">
        <img src="/img/logo2.png" alt="logo" />
        <span>Learning</span>
      </Link>

      {!isAuth && (
        <div className="header-controls">
          {isNotInputHere && (
            <div className={`header-input ${activeInput ? 'active-input' : ''}`}>
              <img src="/img/search.svg" alt="search" />
              <input
                type="text"
                placeholder="Искать курс..."
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => setActiveInput(true)}
                onBlur={() => setActiveInput(false)}
              />
            </div>
          )}

          {isBtnBack && (
            <button className="btnHeaderBack" onClick={() => navigator('/')}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-log-out h-4 w-4 mr-2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" x2="9" y1="12" y2="12"></line>
              </svg>

              <span>Назад к курсам</span>
            </button>
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
              style={{
                backgroundImage: 'url(/img/default-user.svg)',
              }}></div>

            <HeaderPopup activePopup={activePopup} closePopup={() => setActivePopup(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
