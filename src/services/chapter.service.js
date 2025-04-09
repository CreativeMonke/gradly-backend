import Chapter from "../models/chapter.model.js";
import SupabaseStorageService from "../services/supabaseStorage.service.js";

class ChapterService {
  /**
   * Create a new chapter (handles file uploads)
   */
  static async createChapter(data, files) {
    let uploadedFiles = [];

    try {
      // Upload files to Supabase
      if (files && files.length > 0) {
        uploadedFiles = await Promise.all(
          files.map((file) => SupabaseStorageService.uploadFile(file))
        );
      }

      const chapter = new Chapter({
        ...data,
        materials: uploadedFiles,
      });

      await chapter.save();
      return chapter;
    } catch (error) {
      console.error("Error creating chapter:", error.message);

      // ❌ If chapter creation fails, delete uploaded files from Supabase
      if (uploadedFiles.length > 0) {
        await Promise.all(
          uploadedFiles.map((file) =>
            SupabaseStorageService.deleteFile(file.fileUrl)
          )
        );
      }
      throw new Error(error.message);
    }
  }

  static async bulkCreateChapters(chapters) {
    try {
      const createdChapters = await Chapter.insertMany(chapters);
      return createdChapters;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  /**
   * Get chapters by filters (subject, user-created, etc.)
   */
  static async getChapters(filter = {}) {
    try {
      return await Chapter.find(filter).populate("subjectId");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Update a chapter by ID (handles file uploads)
   */
  static async updateChapter(id, updateData, files) {
    console.log("files",files);
    try {
      const chapter = await Chapter.findById(id);
      if (!chapter) throw new Error("Chapter not found");

      let uploadedFiles = chapter.materials; // Keep existing files

      // Upload new files (replace old ones)
      if (files && files.length > 0) {
        const newlyUploadedFiles = await Promise.all(
          files.map((file) => SupabaseStorageService.uploadFile(file))
        );

        uploadedFiles = [...chapter.materials, ...newlyUploadedFiles]; // ✅ Merge instead of replace
      }

      chapter.set({ ...updateData, materials: uploadedFiles });
      await chapter.save();
      return chapter;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Delete a chapter by ID (and remove its files from Supabase)
   */
  static async deleteChapter(id) {
    try {
      const chapter = await Chapter.findById(id);
      if (!chapter) throw new Error("Chapter not found");

      // ❌ Delete files from Supabase
      await Promise.all(
        chapter.materials.map((file) => {
          const data = SupabaseStorageService.deleteFile(file.fileUrl);
          console.log("Deleted file:", file.fileUrl);
        })
      );

      await chapter.deleteOne();
      return { message: "Chapter deleted" };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ChapterService;
