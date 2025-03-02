import express from 'express';
import { UserController } from '../controllers/index.js';
import { checkAuth, handleValidations } from '../middleware/index.js';
import { reqisterValidation, loginValidation } from '../utils/validations.js';

const router = express.Router();

router.post('/register', reqisterValidation, handleValidations, UserController.register);
router.post('/login', loginValidation, handleValidations, UserController.login);
router.get('/me', checkAuth, UserController.getMe);

export default router;
