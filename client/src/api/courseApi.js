import axios from 'axios';

const API_URL = 'http://localhost:8080/courses';

export const fetchCourses = async (tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;
  try {
    const response = await axios.get(
      `${API_URL}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка получения курсов');
  }
};

export const createCourse = async (courseData) => {
  try {
    const response = await axios.post(API_URL, courseData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка добавления курса');
  }
};

export const deleteCourse = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка удаления курса');
  }
};

export const updateCourseStatus = async (id, status) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка обновления статуса курса');
  }
};

export const updateCourse = async (id, courseData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, courseData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка обновления курса');
  }
};

export const filterCourses = async (topic) => {
  try {
    const response = await axios.get(`${API_URL}/filter?topic=${topic}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка фильтрации курсов');
  }
};

export const searchCourses = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search?query=${query}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка поиска курсов');
  }
};
