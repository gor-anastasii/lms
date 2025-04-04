import axios from 'axios';

const API_URL = 'http://localhost:8080/course-parts';

export const fetchCoursePartsInfo = async (tokenUser, courseId) => {
  const token = localStorage.getItem('token') || tokenUser;

  try {
    const response = await axios.get(
      `${API_URL}?courseId=${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true },
    );

    return response;
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
