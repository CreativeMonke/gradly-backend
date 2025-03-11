import Subject from "../models/subject.model.js";
import ChapterService from "../services/chapter.service.js";

class ChapterController {
  /**
   * Create a new chapter
   */
  static async createChapter(req, res) {
    try {
      const { title, subjectId, description, markdownContent } = req.body;

      const chapter = await ChapterService.createChapter(
        {
          title,
          subjectId,
          description,
          markdownContent,
        },
        req.files
      ); // Pass files directly to service
      await Subject.findByIdAndUpdate(subjectId, {
        $push: { chapters: chapter._id },
      });
      return res.status(201).json({ status: "success", data: chapter });
    } catch (error) {
      return res.status(400).json({ status: "error", message: error.message });
    }
  }

  /**
   * Get chapters with optional filters
   */
  static async getChapters(req, res) {
    try {
      const filters = req.query;
      console.log(filters);
      const chapters = await ChapterService.getChapters(filters);
      return res.status(200).json({ status: "success", data: chapters });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  }

  /**
   * Update a chapter by ID
   */
  static async updateChapter(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedChapter = await ChapterService.updateChapter(
        id,
        updateData,
        req.files
      );
      return res.status(200).json({ status: "success", data: updatedChapter });
    } catch (error) {
      return res.status(400).json({ status: "error", message: error.message });
    }
  }

  /**
   * Delete a chapter by ID
   */
  static async deleteChapter(req, res) {
    try {
      const { id } = req.params;
      await ChapterService.deleteChapter(id);
      return res
        .status(200)
        .json({ status: "success", message: "Chapter deleted" });
    } catch (error) {
      return res.status(400).json({ status: "error", message: error.message });
    }
  }
}

export default ChapterController;
