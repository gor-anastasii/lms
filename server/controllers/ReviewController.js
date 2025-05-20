import Review from '../models/ReviewModel.js';
import User from '../models/UserModel.js';
import Course from '../models/CourseModel.js';

export const getReviewsByCourseId = async (req, res) => {
  const { courseId } = req.query;

  try {
    const reviews = await Review.findAll({
      where: { courseId },
      include: {
        model: User,
        attributes: ['username'],
      },
    });

    if (!reviews.length) {
      return res.status(200).json();
    }

    const formattedReviews = reviews.map((review) => ({
      id: review.id,
      username: review.User.username,
      rating: review.rating,
      comment: review.comment,
    }));

    return res.status(200).json(formattedReviews);
  } catch (error) {
    return res.status(500).json({ message: 'Произошла ошибка: ', error });
  }
};

export const getReviewsByUserIdAndCourseId = async (req, res) => {
  const userId = req.userId;
  const { courseId } = req.query;

  try {
    const reviews = await Review.findAll({
      where: {
        userId,
        courseId,
      },
    });

    if (!reviews.length) {
      return res.status(404).json({ message: 'Отзывов не найдено!' });
    }

    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ message: 'Произошла ошибка: ', error });
  }
};

export const createReview = async (req, res) => {
  const { courseId, rating, comment } = req.body;
  const userId = req.userId;

  try {
    const existingReview = await Review.findOne({
      where: { userId, courseId },
    });

    if (existingReview) {
      return res.status(400).json({
        message: 'Вы уже оставляли отзыв для этого курса.',
      });
    }

    const newReview = await Review.create({
      userId,
      courseId,
      rating,
      comment,
    });

    const reviews = await Review.findAll({
      where: { courseId },
    });

    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    await Course.update({ averageRating }, { where: { id: courseId } });

    return res.status(201).json({
      message: 'Отзыв успешно добавлен',
      review: newReview,
      averageRating,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Произошла ошибка: ', error });
  }
};

export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.userId;

  try {
    const review = await Review.findOne({
      where: {
        id: reviewId,
        userId,
      },
    });

    if (!review) {
      return res.status(404).json({ message: 'Отзыв не найден или не принадлежит пользователю.' });
    }

    await Review.destroy({ where: { id: reviewId } });

    const reviews = await Review.findAll({
      where: { courseId: review.courseId },
    });

    const averageRating = reviews.length
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

    await Course.update({ averageRating }, { where: { id: review.courseId } });

    return res.status(200).json({
      message: 'Отзыв успешно удален',
      averageRating,
      reviewId,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Произошла ошибка: ', error });
  }
};

export const deleteReviewAdmin = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.userId;

  try {
    const review = await Review.findOne({
      where: {
        id: reviewId,
      },
    });

    const user = await User.findOne({ where: { id: userId } });
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещен.' });
    }

    if (!review) {
      return res.status(404).json({ message: 'Отзыв не найден.' });
    }

    await Review.destroy({ where: { id: reviewId } });

    const reviews = await Review.findAll({
      where: { courseId: review.courseId },
    });

    const averageRating = reviews.length
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

    await Course.update({ averageRating }, { where: { id: review.courseId } });

    return res.status(200).json({
      message: 'Отзыв успешно удален',
      averageRating,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Произошла ошибка: ', error });
  }
};
