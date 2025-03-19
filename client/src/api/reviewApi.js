import axios from 'axios';

const API_URL = 'http://localhost:8080/review';

export const fetchReviewsByCourseId = async (courseId, tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;
  try {
    const response = await axios.get(`${API_URL}/course`, {
      params: { courseId },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка получения отзывов');
  }
};

export const fetchReviewsByUserIdAndCourseId = async (tokenUser, courseId) => {
  const token = localStorage.getItem('token') || tokenUser;
  try {
    const response = await axios.get(`${API_URL}/user?courseId=${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка получения отзывов');
  }
};

export const createReview = async (reviewData, tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;
  try {
    const response = await axios.post(`${API_URL}/course`, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка создания отзыва');
  }
};

export const deleteReview = async (reviewId, tokenUser) => {
  const token = localStorage.getItem('token') || tokenUser;
  try {
    const response = await axios.delete(`${API_URL}/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка удаления отзыва');
  }
};
