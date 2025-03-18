import express from 'express';
import { ProgressController } from '../controllers/index.js';
import { checkAuth } from '../middleware/index.js';

const router = express.Router();

router.post('/subscribe', checkAuth, ProgressController.subscribeToCourse);
router.patch('/', checkAuth, ProgressController.updateProgress);
router.get('/total-progress', checkAuth, ProgressController.getTotalProgress);
router.get('/course-status', checkAuth, ProgressController.getCourseStatus);

export default router;
