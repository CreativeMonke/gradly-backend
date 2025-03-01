import Chapter from "../models/chapter.model.js";
import SupabaseStorageService from '../services/supabaseStorage.service.js';

class ChapterService {
  /**
   * Create a new chapter
   */
  static async createChapter(req, res) {
    try {
      const { title, subject } = req.body;
      let uploadedFiles = [];

      // Process uploaded files
      if (req.files && req.files.length > 0) {
        uploadedFiles = await Promise.all(
          req.files.map((file) => SupabaseStorageService.uploadFile(file))
        );
      }

      const chapter = await ChapterService.createChapter({
        title,
        subject,
        materials: uploadedFiles,
      });

      return res.status(201).json({ status: "success", data: chapter });
    } catch (error) {
      return res.status(400).json({ status: "error", message: error.message });
    }
  }

  /**
   * Get chapters by filters (subject, user-created, etc.)
   */
  static async getChapters(filter = {}) {
    try {
      return await Chapter.find(filter).populate("subject");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Update a chapter by ID
   */
  static async updateChapter(id, updateData) {
    try {
      return await Chapter.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Delete a chapter by ID
   */
  static async deleteChapter(id) {
    try {
      return await Chapter.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ChapterService;
