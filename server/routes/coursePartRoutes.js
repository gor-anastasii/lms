import express from 'express';
import { CoursePartController } from '../controllers/index.js';
import { checkAuth } from '../middleware/index.js';

const router = express.Router();

router.get('/', checkAuth, CoursePartController.getCourseParts);

export default router;
