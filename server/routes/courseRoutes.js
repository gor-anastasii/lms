import express from 'express';
import { CourseController } from '../controllers/index.js';
import { checkAuth } from '../middleware/index.js';

const router = express.Router();

router.get('/', checkAuth, CourseController.getAllCourses);
router.post('/', CourseController.addCourse);
router.delete('/:id', CourseController.deleteCourse);
router.patch('/:id/status', CourseController.updateCourseStatus);
router.put('/:id', CourseController.updateCourse);
router.get('/search-filter', checkAuth, CourseController.getCoursesWithSearchFilter);
router.get('/details', checkAuth, CourseController.getCourseDetails);

export default router;
