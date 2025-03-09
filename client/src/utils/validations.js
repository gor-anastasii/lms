export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.trim() === '') {
    return 'Email не может быть пустым';
  }
  if (!emailPattern.test(email)) {
    return 'Неверный формат почты';
  }
  return true;
};

export const validatePassword = (password) => {
  if (!password || password.trim() === '') {
    return 'Пароль не может быть пустым';
  }
  if (password.length < 5) {
    return 'Пароль должен быть минимум 5 символов';
  }
  return true;
};

export const validateUsername = (username) => {
  if (!username || username.trim() === '') {
    return 'Имя не может быть пустым';
  }
  if (username.length < 3) {
    return 'Имя должно содержать минимум 3 символа';
  }
  if (username.length > 12) {
    return 'Имя не должно превышать 12 символов';
  }
  return true;
};

export const validateAvatarUrl = (avatarUrl) => {
  if (avatarUrl && avatarUrl.trim() === '') {
    return 'Неверная ссылка на аватарку';
  }
  if (avatarUrl && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|svg)$/.test(avatarUrl)) {
    return 'Неверная ссылка на аватарку';
  }
  return true;
};
