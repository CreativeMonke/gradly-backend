import express from 'express';
import SubjectController from '../controllers/subject.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Create a new subject
router.post('/', authenticateToken, SubjectController.createSubject);

// Get all subjects with optional filters
router.get('/', authenticateToken, SubjectController.getSubjects);

// Update a subject by ID
router.put('/:id', authenticateToken, SubjectController.updateSubject);

// Delete a subject by ID
router.delete('/:id', authenticateToken, SubjectController.deleteSubject);


export default router;