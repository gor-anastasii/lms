import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, fetchUserData } from '../../redux/slices/authSlice';

const AuthLogin = () => {
  const dispatch = useDispatch();
  const { status, error, user, token } = useSelector((state) => state.auth);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    await dispatch(login({ email, password }));
  };

  const fetchData = async () => {
    await dispatch(fetchUserData(token));
    console.log('token', token);
    console.log('local: ', localStorage.getItem('token'));
  };

  return (
    <div className="auth-container">
      <h3>Войдите в свой аккаунт</h3>
      <p>Введите ваш пароль и почту для входа в аккаунт</p>
      <div className="auth-inputs">
        <span>Введите почту</span>
        <input
          type="email"
          placeholder="Почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <span className="error-span"></span>

        <span>Введите пароль</span>
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span className="error-span" onClick={fetchData}>{`${error}`}</span>
      </div>

      <button disabled={status === 'loading'} onClick={handleLogin}>
        {status === 'loading' ? 'Загрузка...' : 'Войти'}
      </button>
    </div>
  );
};

export default AuthLogin;
