import axios from 'axios';

const API_URL = 'http://localhost:8080/progress';

export const fetchProgressInfo = async (tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;

  try {
    const response = await axios.get(
      `${API_URL}/total-progress`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true },
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Ошибка получения данных прогресса');
    } else if (error.request) {
      throw new Error('Нет ответа от сервера');
    } else {
      throw new Error('Ошибка: ' + error.message);
    }
  }
};

export const subscribeToCourse = async (tokenUser, courseId) => {
  const token = localStorage.getItem('token') || tokenUser;

  try {
    const response = await axios.get(
      `${API_URL}/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          courseId: courseId,
        },
      },
      { withCredentials: true },
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Ошибка получения данных прогресса');
    } else if (error.request) {
      throw new Error('Нет ответа от сервера');
    } else {
      throw new Error('Ошибка: ' + error.message);
    }
  }
};

export const updateCourseProgress = async (courseId, currentPartOrder, tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;

  try {
    const response = await axios.patch(
      `${API_URL}/`,
      {
        courseId: courseId,
        currentPartOrder: currentPartOrder,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Ошибка обновления прогресса');
    } else if (error.request) {
      throw new Error('Нет ответа от сервера');
    } else {
      throw new Error('Ошибка: ' + error.message);
    }
  }
};
