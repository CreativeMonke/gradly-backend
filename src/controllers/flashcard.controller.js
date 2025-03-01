import FlashcardService from '../services/flashcard.service.js';

class FlashcardController {
  /**
   * Create a new flashcard
   */
  static async createFlashcard(req, res) {
    try {
      const flashcard = await FlashcardService.createFlashcard(req.body);
      return res.status(201).json({ status: 'success', data: flashcard });
    } catch (error) {
      return res.status(400).json({ status: 'error', message: error.message });
    }
  }

  /**
   * Get flashcards with optional filters
   */
  static async getFlashcards(req, res) {
    try {
      const filters = req.query;
      const flashcards = await FlashcardService.getFlashcards(filters);
      return res.status(200).json({ status: 'success', data: flashcards });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }

  /**
   * Update a flashcard by ID
   */
  static async updateFlashcard(req, res) {
    try {
      const { id } = req.params;
      const updatedFlashcard = await FlashcardService.updateFlashcard(id, req.body);
      return res.status(200).json({ status: 'success', data: updatedFlashcard });
    } catch (error) {
      return res.status(400).json({ status: 'error', message: error.message });
    }
  }

  /**
   * Delete a flashcard by ID
   */
  static async deleteFlashcard(req, res) {
    try {
      const { id } = req.params;
      await FlashcardService.deleteFlashcard(id);
      return res.status(200).json({ status: 'success', message: 'Flashcard deleted' });
    } catch (error) {
      return res.status(400).json({ status: 'error', message: error.message });
    }
  }

  /**
   * Log a flashcard review attempt
   */
  static async logReview(req, res) {
    try {
      const { id } = req.params;
      const { isCorrect } = req.body;
      const flashcard = await FlashcardService.logReview(id, isCorrect);
      return res.status(200).json({ status: 'success', data: flashcard });
    } catch (error) {
      return res.status(400).json({ status: 'error', message: error.message });
    }
  }
}

export default FlashcardController;
