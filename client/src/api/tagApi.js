import axios from 'axios';

const API_URL = 'http://localhost:8080/tags';

export const createTag = async (tokenUser, tagName) => {
  const token = localStorage.getItem('token') || tokenUser;
  try {
    const response = await axios.post(
      API_URL,

      { name: tagName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true },
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка добавления тега');
  }
};
