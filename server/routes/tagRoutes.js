import express from 'express';
import { TagsController } from '../controllers/index.js';
import { checkAuth } from '../middleware/index.js';

const router = express.Router();

router.post('/', checkAuth, TagsController.createTag);

export default router;
