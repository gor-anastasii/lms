import express from 'express';
import { CourseController } from '../controllers/index.js';

const router = express.Router();

router.get('/', CourseController.getAllCourses);
router.post('/', CourseController.addCourse);
router.delete('/:id', CourseController.deleteCourse);
router.patch('/:id/status', CourseController.updateCourseStatus);
router.put('/:id', CourseController.updateCourse);
router.get('/filter', CourseController.filterCourses);
router.get('/search', CourseController.searchCourses);

export default router;
