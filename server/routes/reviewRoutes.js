import express from 'express';
import { ReviewController } from '../controllers/index.js';
import { checkAuth } from '../middleware/index.js';
import { reviewCreateValidation } from '../utils/validations.js';

const router = express.Router();

router.get('/course', checkAuth, ReviewController.getReviewsByCourseId);
router.get('/user', checkAuth, ReviewController.getReviewsByUserIdAndCourseId);
router.post('/course', checkAuth, reviewCreateValidation, ReviewController.createReview);
router.delete('/admin-mode/:reviewId', checkAuth, ReviewController.deleteReviewAdmin);
router.delete('/:reviewId', checkAuth, ReviewController.deleteReview);

export default router;
