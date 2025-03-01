import express from 'express';
import ChapterController from '../controllers/chapter.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';

const router = express.Router();

// Create a new chapter
router.post('/', authenticateToken, upload.array('files', 5), ChapterController.createChapter);

// Get all chapters with optional filters
router.get('/', authenticateToken, ChapterController.getChapters);

// Update a chapter by ID
router.put('/:id', authenticateToken, ChapterController.updateChapter);

// Delete a chapter by ID
router.delete('/:id', authenticateToken, ChapterController.deleteChapter);

export default router;
