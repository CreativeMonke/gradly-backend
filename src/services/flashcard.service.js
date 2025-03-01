import Flashcard from '../models/flashcard.model.js';

class FlashcardService {
  /**
   * Create a new flashcard
   */
  static async createFlashcard(data) {
    try {
      const flashcard = new Flashcard(data);
      await flashcard.save();
      return flashcard;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Get flashcards by filters (user, subject, tags, etc.)
   */
  static async getFlashcards(filter = {}) {
    try {
      return await Flashcard.find(filter);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Update a flashcard
   */
  static async updateFlashcard(id, updateData) {
    try {
      return await Flashcard.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Delete a flashcard
   */
  static async deleteFlashcard(id) {
    try {
      return await Flashcard.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Log a flashcard review attempt
   */
  static async logReview(flashcardId, isCorrect) {
    try {
      const flashcard = await Flashcard.findById(flashcardId);
      if (!flashcard) throw new Error('Flashcard not found');

      // Update review schedule
      const interval = isCorrect ? flashcard.reviewSchedule.interval * 2 : 1;
      const nextReviewDate = new Date();
      nextReviewDate.setDate(nextReviewDate.getDate() + interval);
      
      flashcard.isCorrect = isCorrect;
      flashcard.lastReviewed = new Date();
      flashcard.reviewSchedule = { nextReviewDate, interval };

      await flashcard.save();
      return flashcard;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default FlashcardService;
