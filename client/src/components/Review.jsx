import React from 'react';
import { ClipLoader } from 'react-spinners';
import { svgIconComments, svgIconGarbage, svgIconStart } from '../utils/svgIcons';
import { fetchReviewsByUserIdAndCourseId, createReview, deleteReview } from '../api/reviewApi';
import { formatDate } from '../utils/formatDate';
import { useSelector } from 'react-redux';

const Review = ({ courseId }) => {
  const [reviews, setReviews] = React.useState([]);
  const [status, setStatus] = React.useState('idle');
  const [error, setError] = React.useState(null);
  const { token } = useSelector((state) => state.auth);

  const [ratingInput, setRatingInput] = React.useState('');
  const [reviewInput, setReviewInput] = React.useState('');
  const [validationErrors, setValidationErrors] = React.useState({});

  const fetchReviews = async () => {
    setStatus('loading');
    try {
      const response = await fetchReviewsByUserIdAndCourseId(token, courseId);
      setReviews(response.data);
      setStatus('succeeded');
    } catch (err) {
      setStatus('failed');
      setError(err.message);
    }
  };

  const handleRatingChange = (e) => {
    const value = e.target.value;
    if (/^(5(\.0)?|[0-4](\.\d)?|0(\.0)?)?$/.test(value) || value === '') {
      setRatingInput(value);

      if (validationErrors.rating) {
        setValidationErrors({});
      }
    }
  };

  const handleReviewChange = (e) => {
    setReviewInput(e.target.value);
    if (validationErrors.review || validationErrors.rating) {
      setValidationErrors({});
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!reviewInput.trim()) {
      errors.review = 'Отзыв не может быть пустым или состоять только из пробелов';
    }
    if (!ratingInput) {
      errors.rating = 'Рейтинг обязателен';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reviews.length === 1) {
      setValidationErrors({ rating: 'Вы уже оставили отзыв для этого курса.' });
      return;
    }

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});

    const reviewData = {
      courseId,
      rating: parseFloat(ratingInput),
      comment: reviewInput.trim(),
    };

    try {
      const response = await createReview(reviewData, token);
      setReviews((prevReviews) => [...prevReviews, response.data.review]);
      setRatingInput('');
      setReviewInput('');
    } catch (err) {
      console.error('Ошибка при добавлении отзыва:', err);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId, token);
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId)); // Удаляем отзыв
    } catch (err) {
      console.error('Ошибка при удалении отзыва:', err);
    }
  };

  React.useEffect(() => {
    fetchReviews();
  }, [token, courseId]);

  return (
    <div className="content course-part-content">
      <div className="review-container">
        <div className="create-review">
          <h2>Оставьте отзыв</h2>
          <p>Будем очень рады, если вы оцените курс!</p>

          <div className="review-inputs">
            <div>
              {svgIconComments()}
              <span>Напишите отзыв</span>
            </div>
            <textarea value={reviewInput} onChange={handleReviewChange}></textarea>
            {validationErrors.review && (
              <span className="error-span">{validationErrors.review}</span>
            )}

            <div>
              {svgIconStart()}
              <span>Выберите оценку курсу</span>
            </div>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={ratingInput}
              onChange={handleRatingChange}
              placeholder="0.0 - 5.0"
            />
            {validationErrors.rating && (
              <span className="error-span">{validationErrors.rating}</span>
            )}
          </div>

          <button className="save-review" onClick={handleSubmit}>
            <span>Сохранить отзыв</span>
          </button>
        </div>

        <div className="your-reviews">
          <h3>Ваш отзыв</h3>
          {status === 'loading' && (
            <div className="loading">
              <ClipLoader color="#cb91d9" loading={true} size={50} />
            </div>
          )}

          {status !== 'loading' && (error || !Array.isArray(reviews) || reviews.length === 0) ? (
            <p>Отзывов пока нет</p>
          ) : (
            <ul>
              {reviews.map((review) => (
                <li key={review.id} className="your-review">
                  <div className="review-rating">
                    <div>
                      {svgIconStart()}
                      <span>Рейтинг: {review.rating}</span>
                    </div>
                    <button className="deleteReview" onClick={() => handleDeleteReview(review.id)}>
                      {svgIconGarbage()}
                    </button>
                  </div>
                  <p>{review.comment}</p>
                  <span>Создано: {formatDate(review.createdAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
