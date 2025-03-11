import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { generateSubjectDescription } from '../controllers/ai.controller.js';

const router = express.Router();

router.post('/generate-subject-description', authenticateToken, generateSubjectDescription);

export default router;
