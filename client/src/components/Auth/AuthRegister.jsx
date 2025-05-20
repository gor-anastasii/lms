import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, fetchUserData, clearAuthError } from '../../redux/slices/authSlice';
import { validateEmail, validatePassword, validateUsername } from '../../utils/validations';
import { useNavigate } from 'react-router';

const AuthRegister = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { status, error, token } = useSelector((state) => state.auth);

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [usernameError, setUsernameError] = React.useState('');

  const handleRegister = async () => {
    setEmailError('');
    setPasswordError('');
    setUsernameError('');

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const usernameValidation = validateUsername(username);

    if (emailValidation !== true) {
      setEmailError(emailValidation);
    }
    if (passwordValidation !== true) {
      setPasswordError(passwordValidation);
    }
    if (usernameValidation !== true) {
      setUsernameError(usernameValidation);
    }

    if (emailValidation !== true || passwordValidation !== true || usernameValidation !== true) {
      return;
    }

    try {
      await dispatch(register({ username, email, password, role: 'student' })).unwrap();
      await dispatch(fetchUserData(token));
      navigator('/');
    } catch (err) {
      console.error('Ошибка при регистрации:', err);
    }
  };

  return (
    <div className="auth-container">
      <h3>Создайте новый аккаунт</h3>
      <p>Введите имя, пароль и почту для создания аккаунта</p>
      <div className="auth-inputs">
        <span>Введите имя</span>
        <input
          type="email"
          placeholder="Имя"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (usernameError && e.target.value.trim() === '') {
              setUsernameError('');
            }
            if (error) {
              dispatch(clearAuthError());
            }
          }}
          required
        />
        <span className="error-span">{usernameError}</span>

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
        disabled={status === 'loading' || password === '' || email === '' || username === ''}
        className={
          status === 'loading' || password === '' || email === '' || username === ''
            ? 'disabled-btn'
            : ''
        }
        onClick={handleRegister}>
        Зарегистрироваться
      </button>
      {error && <span className="server-error">{error}</span>}
    </div>
  );
};

export default AuthRegister;
