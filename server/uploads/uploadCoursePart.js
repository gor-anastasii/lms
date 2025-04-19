import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const coursePartImageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'coursepart_images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
  },
});

const uploadCoursePartImage = multer({ storage: coursePartImageStorage });

export default uploadCoursePartImage;
