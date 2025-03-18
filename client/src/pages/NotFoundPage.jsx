import React from 'react';
import { useNavigate } from 'react-router';

const NotFoundPage = () => {
  const navigator = useNavigate();
  return (
    <div className="notfoundpage">
      <h1>404</h1>
      <p>Мы не смогли найти страницу, которую вы искали.</p>
      <button onClick={() => navigator('/')}>Вернуться на главную</button>
    </div>
  );
};

export default NotFoundPage;
