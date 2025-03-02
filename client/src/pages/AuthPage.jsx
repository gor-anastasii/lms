import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';

import AuthLogin from '../components/Auth/AuthLogin';
import AuthRegister from '../components/Auth/AuthRegister';

const AuthPage = () => {
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState(1);

  const onAuthBtnsClick = (route, i) => {
    navigate(route);
    setActiveBtn(i);
  };

  return (
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
  );
};

export default AuthPage;
