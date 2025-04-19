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

export const createTeacherCoursePart = async (tokenUser, courseId, courseData) => {
  const token = localStorage.getItem('token') || tokenUser;
  try {
    const response = await axios.post(`${API_URL}?id=${courseId}`, courseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка добавления раздела курса');
  }
};

export const deleteCoursePart = async (coursePartId, tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;

  try {
    await axios.delete(`${API_URL}/${coursePartId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка удаления раздела курса');
  }
};

export const updateCoursePartsOrder = async (tokenUser, courseId, updatedParts) => {
  const token = localStorage.getItem('token') || tokenUser;

  try {
    await axios.patch(
      `${API_URL}/${courseId}/parts/order`,
      { parts: updatedParts },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка обновления порядка глав');
  }
};

export const updateTextFieldsCoursePart = async (courseId, id, coursePartData, tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;
  try {
    const response = await axios.patch(
      `${API_URL}/teacher-mode/text-update/${courseId}/${id}`,
      coursePartData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка обновления раздела курса');
  }
};

export const uploadCoursePartImage = async (partId, file, tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.patch(
      `${API_URL}/teacher-mode/imageUpload?id=${partId}`,
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
    throw new Error(error.response?.data?.message || 'Ошибка загрузки изображения раздела курса');
  }
};

export const updateCoursePartImageByUrl = async (partId, imageUrl, type, tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;

  try {
    const response = await axios.patch(
      `${API_URL}/teacher-mode/image?id=${partId}`,
      { imageUrl, type },
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

export const deleteCoursePartImage = async (partId, tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;

  try {
    const response = await axios.delete(`${API_URL}/teacher-mode/media?id=${partId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка удаления изображения раздела курса');
  }
};

export const updateCoursePartStatus = async (partId, status, tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;

  try {
    const response = await axios.patch(
      `${API_URL}/teacher-mode/status/${partId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка обновления статуса раздела курса');
  }
};
