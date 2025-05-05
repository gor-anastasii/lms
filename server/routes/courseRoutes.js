import express from 'express';
import { CourseController } from '../controllers/index.js';
import { checkAuth } from '../middleware/index.js';
import uploadCourseImage from '../uploads/uploadCourse.js';

const router = express.Router();

router.get('/', checkAuth, CourseController.getAllCourses);
router.get('/search-filter', checkAuth, CourseController.getCoursesWithSearchFilter);
router.get('/all-course/:id', checkAuth, CourseController.getCourseById);
router.get('/details', checkAuth, CourseController.getCourseDetails);
router.get('/inprogress', checkAuth, CourseController.getInProgressCourses);
router.get('/completed', checkAuth, CourseController.getCompletedCourses);

router.get('/teacher-mode', checkAuth, CourseController.getCoursesByTeacher);
router.post('/teacher-mode', checkAuth, CourseController.createTeacherCourse);
router.delete('/teacher-mode/course/:id', checkAuth, CourseController.deleteCourse);
router.patch('/teacher-mode/text-update/:id', checkAuth, CourseController.updateTextFields);
router.post('/teacher-mode/tags/:id', checkAuth, CourseController.linkTagsToCourse);
router.patch(
  '/teacher-mode/published/:id',
  checkAuth,
  CourseController.updateCoursePublishedStatus,
);
router.get('/teacher-mode/analytics', checkAuth, CourseController.getTeacherCourseStatistics);

router.patch('/teacher-mode/status/:id', checkAuth, CourseController.updateCourseStatus);

router.patch(
  '/teacher-mode/imageUpload',
  checkAuth,
  uploadCourseImage.single('image'),
  CourseController.updateCourseImageUpload,
);

router.patch('/teacher-mode/image', checkAuth, CourseController.updateCourseImage);
router.delete('/teacher-mode/image', checkAuth, CourseController.deleteCourseImageUrl);

router.get('/admin-mode/courses', checkAuth, CourseController.getAllCoursesForAdmin);
router.patch('/admin-mode/blocked/:id', checkAuth, CourseController.blockedCourse);

export default router;
