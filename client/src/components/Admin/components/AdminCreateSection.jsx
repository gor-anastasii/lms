import React from 'react';
import { createTeacher } from '../../../api/authApi';
import { validateEmail, validatePassword, validateUsername } from '../../../utils/validations';

const AdminCreateSection = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [usernameError, setUsernameError] = React.useState('');
  const [loading, setLoading] = React.useState(false); // Состояние для отслеживания загрузки

  const handleRegister = async () => {
    setEmailError('');
    setPasswordError('');
    setUsernameError('');
    setLoading(true);

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
      setLoading(false);
      return;
    }

    try {
      await createTeacher({ username, email, password, role: 'teacher' });
      setEmail('');
      setUsername('');
      setPassword('');
    } catch (err) {
      console.error('Ошибка при регистрации:', err);
      setPasswordError('Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-create-section">
      <h3>Создать нового учителя</h3>
      <form>
        <label>Имя учителя</label>
        <input
          type="text"
          placeholder="Ввести имя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Почта</label>
        <input
          type="text"
          placeholder="Ввести почту"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Пароль</label>
        <input
          type="password"
          placeholder="Ввести пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <p className="error-text">{usernameError || emailError || passwordError}</p>

        <button
          disabled={loading || password === '' || email === '' || username === ''}
          className={
            loading || password === '' || email === '' || username === '' ? 'disabled-btn' : ''
          }
          onClick={handleRegister}>
          {loading ? 'Создание...' : 'Создать'}
        </button>
      </form>
    </section>
  );
};

export default AdminCreateSection;
