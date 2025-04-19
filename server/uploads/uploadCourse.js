import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const courseImageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'course_images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
  },
});

const uploadCourseImage = multer({ storage: courseImageStorage });

export default uploadCourseImage;
