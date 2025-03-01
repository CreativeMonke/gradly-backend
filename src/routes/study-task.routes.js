import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import StudyTaskController from '../controllers/study-task.controller.js';

const router = express.Router();

// Create a new study task
router.post('/', authenticateToken, StudyTaskController.createTask);

// Get all study tasks with optional filters
router.get('/', authenticateToken, StudyTaskController.getTasks);

// Update a study task by ID
router.put('/:id', authenticateToken, StudyTaskController.updateTask);

// Delete a study task by ID
router.delete('/:id', authenticateToken, StudyTaskController.deleteTask);

export default router;