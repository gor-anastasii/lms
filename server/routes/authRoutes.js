import express from 'express';
import { UserController } from '../controllers/index.js';
import { checkAuth, handleValidations } from '../middleware/index.js';
import { reqisterValidation, loginValidation } from '../utils/validations.js';
import upload from '../uploads/uploadUser.js';

const router = express.Router();

router.post('/register', reqisterValidation, handleValidations, UserController.register);
router.post('/login', loginValidation, handleValidations, UserController.login);
router.get('/me', checkAuth, UserController.getMe);
router.delete('/me', checkAuth, UserController.deleteUser);
router.patch('/me/username', checkAuth, UserController.updateUsername);
router.patch('/me/image', checkAuth, upload.single('image'), UserController.updateProfileImage);
router.delete('/me/image', checkAuth, UserController.deleteProfileImage);

export default router;
