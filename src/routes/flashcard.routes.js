import express from 'express';
import FlashcardController from '../controllers/flashcard.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Create a new flashcard
router.post('/', authenticateToken, FlashcardController.createFlashcard);

// Get all flashcards with optional filters
router.get('/', authenticateToken, FlashcardController.getFlashcards);

// Update a flashcard by ID
router.put('/:id', authenticateToken, FlashcardController.updateFlashcard);

// Delete a flashcard by ID
router.delete('/:id', authenticateToken, FlashcardController.deleteFlashcard);

// Log a flashcard review attempt
router.post('/:id/review', authenticateToken, FlashcardController.logReview);

export default router;
