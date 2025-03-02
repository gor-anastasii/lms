import React from 'react';

const AuthRegister = () => {
  return (
    <div className="auth-container">
      <h3>Создайте новый аккаунт</h3>
      <p>Введите имя, пароль и почту для создания аккаунта</p>
      <div className="auth-inputs">
        <span>Введите имя</span>
        <input type="email" placeholder="Имя" />
        <span className="error-span"></span>

        <span>Введите почту</span>
        <input type="email" placeholder="Почта" />
        <span className="error-span"></span>

        <span>Введите пароль</span>
        <input type="password" placeholder="Пароль" />
        <span className="error-span"></span>
      </div>

      <button>Зарегистрироваться</button>
    </div>
  );
};

export default AuthRegister;
