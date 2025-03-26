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

    return response.data.map((course) => ({
      ...course,
      progress: course.Progresses.length > 0 ? course.Progresses[0].progress : null,
    }));
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

export const fetchCourseDetails = async (courseId, tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;

  try {
    const response = await axios.get(`${API_URL}/details?courseId=${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка получения деталей курса');
  }
};

export const fetchCoursesWithSearchFilter = async (
  tokenUser,
  searchQuery = '',
  filterTopic = 'Все',
) => {
  const token = localStorage.getItem('token') || tokenUser;
  try {
    console.log('search: ', searchQuery, ' topic: ', filterTopic);
    const response = await axios.get(
      `${API_URL}/search-filter?query=${searchQuery}&topic=${filterTopic}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка получения курсов');
  }
};
