import React, { useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router';

import NotFoundPage from './NotFoundPage';

import AuthLogin from '../components/Auth/AuthLogin';
import AuthRegister from '../components/Auth/AuthRegister';
import Header from '../components/Header/Header';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeBtn, setActiveBtn] = useState(1);
  const [isValidPath, setIsValidPath] = useState(true);

  React.useEffect(() => {
    if (location.pathname === '/auth/signup') {
      setActiveBtn(0);
      setIsValidPath(true);
    } else if (location.pathname === '/auth/signin') {
      setActiveBtn(1);
      setIsValidPath(true);
    } else {
      setIsValidPath(false);
    }
  }, [location.pathname]);

  const onAuthBtnsClick = (route, i) => {
    navigate(route);
    setActiveBtn(i);
  };

  return (
    <>
      {isValidPath ? (
        <>
          <Header />
          <main>
            <div className="auth-wrapper">
              <div className="auth-block">
                <div className="auth-btns">
                  {[
                    { value: 'Регистрация', path: '/auth/signup' },
                    { value: 'Вход', path: '/auth/signin' },
                  ].map((item, i) => {
                    return (
                      <button
                        key={item.value}
                        onClick={() => onAuthBtnsClick(item.path, i)}
                        className={activeBtn === i ? 'active-button' : ''}>
                        {item.value}
                      </button>
                    );
                  })}
                </div>

                <Routes>
                  <Route path="/signup" element={<AuthRegister />} />
                  <Route path="/signin" element={<AuthLogin />} />
                </Routes>
              </div>
            </div>
          </main>
        </>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default AuthPage;
