import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, fetchUserData, clearAuthError } from '../../redux/slices/authSlice';
import { validateEmail, validatePassword } from '../../utils/validations';
import { useNavigate } from 'react-router';

const AuthLogin = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { status, error, token } = useSelector((state) => state.auth);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    if (emailValidation !== true) {
      setEmailError(emailValidation);
    }
    if (passwordValidation !== true) {
      setPasswordError(passwordValidation);
    }
    if (emailValidation !== true || passwordValidation !== true) {
      return;
    }

    try {
      await dispatch(login({ email, password })).unwrap();
      navigator('/');
      await dispatch(fetchUserData(token));
    } catch (err) {
      console.error('Ошибка при входе:', err);
    }
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
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError && e.target.value.trim() === '') {
              setEmailError('');
            }
            if (error) {
              dispatch(clearAuthError());
            }
          }}
          required
        />
        <span className="error-span">{emailError}</span>

        <span>Введите пароль</span>
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError && e.target.value.trim() === '') {
              setPasswordError('');
            }
            if (error) {
              dispatch(clearAuthError());
            }
          }}
          required
        />
        <span className="error-span">{passwordError}</span>
      </div>
      <button
        disabled={status === 'loading' || password === '' || email === ''}
        className={status === 'loading' || password === '' || email === '' ? 'disabled-btn' : ''}
        onClick={handleLogin}>
        Войти
      </button>
      <span className="server-error">{error}</span>
    </div>
  );
};

export default AuthLogin;
