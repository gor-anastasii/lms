import express from 'express';
import { CoursePartController } from '../controllers/index.js';
import { checkAuth } from '../middleware/index.js';
import uploadCoursePartImage from '../uploads/uploadCoursePart.js';

const router = express.Router();

router.get('/', checkAuth, CoursePartController.getCourseParts);
router.post('/', checkAuth, CoursePartController.createTeacherCoursePart);
router.delete('/:id', checkAuth, CoursePartController.deleteCoursePart);
router.patch('/:courseId/parts/order', checkAuth, CoursePartController.updateCoursePartsOrder);
router.patch(
  '/teacher-mode/text-update/:courseId/:id',
  checkAuth,
  CoursePartController.updateTextFields,
);

router.patch(
  '/teacher-mode/imageUpload',
  checkAuth,
  uploadCoursePartImage.single('image'),
  CoursePartController.updateCoursePartImageUpload,
);
router.patch('/teacher-mode/status/:id', checkAuth, CoursePartController.updateCoursePartStatus);

router.patch('/teacher-mode/image', checkAuth, CoursePartController.updateCoursePartImage);
router.delete('/teacher-mode/media', checkAuth, CoursePartController.deleteCoursePartMediaUrl);

export default router;
