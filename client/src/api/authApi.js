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
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error('Ошибка входа');
    } else if (error.request) {
      throw new Error('Нет ответа от сервера');
    } else {
      throw new Error('Ошибка: ' + error.message);
    }
  }
};

export const fetchUser = async (tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;

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

export const deleteUser = async (tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;

  try {
    const response = await axios.delete(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Ошибка удаления пользователя');
    } else if (error.request) {
      throw new Error('Нет ответа от сервера');
    } else {
      throw new Error('Ошибка: ' + error.message);
    }
  }
};

export const updateUsername = async (tokenUser, username) => {
  const token = localStorage.getItem('token') || tokenUser;

  try {
    const response = await axios.patch(
      `${API_URL}/me/username`,
      { username },
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
      throw new Error(error.response.data.message || 'Ошибка обновления имени пользователя');
    } else if (error.request) {
      throw new Error('Нет ответа от сервера');
    } else {
      throw new Error('Ошибка: ' + error.message);
    }
  }
};

export const updateProfileImg = async (tokenUser, image) => {
  const token = localStorage.getItem('token') || tokenUser;
  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await axios.patch(`${API_URL}/me/image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Ошибка изменения фотографии');
    } else if (error.request) {
      throw new Error('Нет ответа от сервера');
    } else {
      throw new Error('Ошибка: ' + error.message);
    }
  }
};

export const deleteProfileImg = async (tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;

  try {
    const response = await axios.delete(
      `${API_URL}/me/image`,
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
      throw new Error(error.response.data.message || 'Ошибка удаления фотографии пользователя');
    } else if (error.request) {
      throw new Error('Нет ответа от сервера');
    } else {
      throw new Error('Ошибка: ' + error.message);
    }
  }
};

export const getAllTeachers = async (page = 1, search = '', tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;

  try {
    const response = await axios.get(
      `${API_URL}/admin-mode/teachers?page=${page}&search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Ошибка получения преподавателей');
    } else if (error.request) {
      throw new Error('Нет ответа от сервера');
    } else {
      throw new Error('Ошибка: ' + error.message);
    }
  }
};

export const createTeacher = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/admin-mode/register-teacher`, userData);
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

export const deleteTeacherAdmin = async (tokenUser, teacherId) => {
  const token = localStorage.getItem('token') || tokenUser;

  try {
    const response = await axios.delete(`${API_URL}/admin-mode/teacher/${teacherId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Ошибка удаления пользователя');
    } else if (error.request) {
      throw new Error('Нет ответа от сервера');
    } else {
      throw new Error('Ошибка: ' + error.message);
    }
  }
};

export const updateTeachernameAdmin = async (tokenUser, username, teacherId) => {
  const token = localStorage.getItem('token') || tokenUser;

  try {
    const response = await axios.patch(
      `${API_URL}/admin-mode/teachername`,
      { username, teacherId },
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
      throw new Error(error.response.data.message || 'Ошибка обновления имени пользователя');
    } else if (error.request) {
      throw new Error('Нет ответа от сервера');
    } else {
      throw new Error('Ошибка: ' + error.message);
    }
  }
};
