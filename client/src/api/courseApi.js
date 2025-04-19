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

export const fetchTeacherCourses = async (tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;
  try {
    const response = await axios.get(
      `${API_URL}/teacher-mode`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true },
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка получения курсов');
  }
};

export const createTeacherCourse = async (courseData, tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;
  try {
    const response = await axios.post(`${API_URL}/teacher-mode`, courseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка добавления курса');
  }
};

export const updateTextFields = async (id, courseData, tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;
  try {
    const response = await axios.patch(`${API_URL}/teacher-mode/text-update/${id}`, courseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка обновления курса');
  }
};

export const linkTagsToCourse = async (tokenUser, courseId, tagIds) => {
  const token = localStorage.getItem('token') || tokenUser;
  try {
    const response = await axios.post(
      `${API_URL}/teacher-mode/tags/${courseId}`,
      { tagIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

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

export const uploadCourseImage = async (courseId, file, tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.patch(
      `${API_URL}/teacher-mode/imageUpload?id=${courseId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data.imageUrl;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка загрузки изображения курса');
  }
};

export const updateCourseImageByUrl = async (courseId, imageUrl, tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;

  try {
    const response = await axios.patch(
      `${API_URL}/teacher-mode/image?id=${courseId}`,
      { imageUrl },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.imageUrl;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка обновления изображения по ссылке');
  }
};

export const deleteCourseImage = async (courseId, tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;

  try {
    const response = await axios.delete(`${API_URL}/teacher-mode/image?id=${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка удаления изображения курса');
  }
};

export const deleteCourse = async (courseId, tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;

  try {
    const response = await axios.delete(`${API_URL}/teacher-mode/course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка удаления курса');
  }
};

export const updateCoursePublishedStatus = async (courseId, newPublishedStatus, tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;

  try {
    const response = await axios.patch(
      `${API_URL}/teacher-mode/published/${courseId}`,
      { published: newPublishedStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка обновления статуса опубликованности');
  }
};

export const updateCourseStatus = async (courseId, newStatus, tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;

  try {
    const response = await axios.patch(
      `${API_URL}/teacher-mode/status/${courseId}`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка обновления статуса опубликованности');
  }
};
