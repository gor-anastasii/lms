import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Ошибка регистрации');
    } else if (error.request) {
      throw new Error('Нет ответа от сервера');
    } else {
      throw new Error('Ошибка: ' + error.message);
    }
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData, { withCredentials: true });
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error.message);
    if (error.response) {
      throw new Error(error.response.data[0].msg || 'Ошибка входа');
    } else if (error.request) {
      throw new Error('Нет ответа от сервера');
    } else {
      throw new Error('Ошибка: ' + error.message);
    }
  }
};

export const fetchUser = async (tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;
  console.log('tokennn ', tokenUser);
  try {
    const response = await axios.get(
      `${API_URL}/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true },
    );

    console.log('get me: ', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Ошибка получения данных пользователя');
    } else if (error.request) {
      throw new Error('Нет ответа от сервера');
    } else {
      throw new Error('Ошибка: ' + error.message);
    }
  }
};
