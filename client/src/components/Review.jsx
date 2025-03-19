import React from 'react';
import { ClipLoader } from 'react-spinners';
import { useSelector, useDispatch } from 'react-redux';
import { svgIconComments, svgIconGarbage, svgIconStart } from '../utils/svgIcons';
import { fetchUserReviews, addReview, removeReview } from '../redux/slices/reviewSlice';
import { formatDate } from '../utils/formatDate';

const Review = ({ courseId }) => {
  const dispatch = useDispatch();
  const { reviews, status, error } = useSelector((state) => state.review);
  const { token } = useSelector((state) => state.auth);

  const [ratingInput, setRatingInput] = React.useState('');
  const [reviewInput, setReviewInput] = React.useState('');
  const [validationErrors, setValidationErrors] = React.useState({});

  const handleRatingChange = (e) => {
    const value = e.target.value;
    if (/^(5(\.0)?|[0-4](\.\d)?|0(\.0)?)?$/.test(value) || value === '') {
      setRatingInput(value);
    }
  };

  const handleReviewChange = (e) => {
    setReviewInput(e.target.value);
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
      await dispatch(addReview(reviewData)).unwrap();
      setRatingInput('');
      setReviewInput('');
      dispatch(fetchUserReviews({ userData: token, courseId }));
    } catch (err) {
      console.error('Ошибка при добавлении отзыва:', err);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await dispatch(removeReview({ reviewId, userData: token })).unwrap();
      dispatch(fetchUserReviews({ userData: token, courseId }));
    } catch (err) {
      console.error('Ошибка при удалении отзыва:', err);
    }
  };

  React.useEffect(() => {
    dispatch(fetchUserReviews({ userData: token, courseId }));
  }, [dispatch, token, courseId]);

  if (status === 'loading') {
    return (
      <div className="loading">
        <ClipLoader color="#cb91d9" loading={true} size={50} />
      </div>
    );
  }

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-flame h-4 w-4 mr-2">
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
            </svg>
            <span>Сохранить отзыв</span>
          </button>
        </div>

        <div className="your-reviews">
          <h3>Ваши отзывы</h3>
          {error || !Array.isArray(reviews) || reviews.length === 0 ? (
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
