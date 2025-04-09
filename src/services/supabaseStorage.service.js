import { supabase, SUPABASE_BUCKET_NAME } from "../config/supabaseClient.js";
import Chapter from "../models/chapter.model.js";
import Subject from "../models/subject.model.js";

class SupabaseStorageService {
  /**
   * Uploads a file to Supabase Storage and returns its URL
   */
  static async uploadFile(file, folder = "chapters") {
    try {
      const filePath = `${folder}/${Date.now()}-${file.originalname}`;

      const { data, error } = await supabase.storage
        .from(SUPABASE_BUCKET_NAME)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) {
        console.log(error);
        throw new Error(error.message);
      }

      // Generate a public URL for the uploaded file
      const { publicUrl } = supabase.storage
        .from(SUPABASE_BUCKET_NAME)
        .getPublicUrl(data.path).data;

      return {
        filename: file.originalname,
        fileType: file.mimetype,
        fileUrl: data.path,
        filePublicUrl: publicUrl,
        uploadedAt: new Date(),
      };
    } catch (error) {
      throw new Error(`File upload failed: ${error.message}`);
    }
  }

  static async deleteFiles({
    fileUrls,
    type = "chapters",
    filters = {},
    inUse = false,
  }) {
    try {
      const folderPrefix = `${type}/`;
      const filePaths = fileUrls.map((url) =>
        url.startsWith(folderPrefix) ? url : `${folderPrefix}${url}`
      );

      let linkedFiles = [];
      let modelInstance = null;

      // Step 1: Load model instance and linked files
      if (type === "chapters" && filters.chapterId) {
        modelInstance = await Chapter.findById(filters.chapterId);
        linkedFiles = modelInstance?.materials.map((f) => f.fileUrl) || [];
      } else if (type === "subjects" && filters.subjectId) {
        modelInstance = await Subject.findById(filters.subjectId);
        linkedFiles = modelInstance?.materials.map((f) => f.fileUrl) || [];
      }

      const filesToDelete = [];
      const skippedFiles = [];

      // Step 2: Decide deletion based on `inUse`
      for (const filePath of filePaths) {
        if (linkedFiles.includes(filePath)) {
          if (inUse && modelInstance) {
            // Remove from DB
            modelInstance.materials = modelInstance.materials.filter(
              (mat) => mat.fileUrl !== filePath
            );
            filesToDelete.push(filePath);
          } else {
            skippedFiles.push(filePath);
          }
        } else {
          filesToDelete.push(filePath);
        }
      }

      // Step 3: Save model if changes were made
      if (inUse && modelInstance) {
        await modelInstance.save();
      }

      // Step 4: Delete from Supabase
      const { data } = await supabase.storage
        .from(SUPABASE_BUCKET_NAME)
        .remove(filesToDelete);

      return {
        message: "Deletion processed",
        status: "success",
        data: {
          deleted: filesToDelete,
          skipped: skippedFiles,
          filters,
          supabaseResponse: data,
        },
      };
    } catch (error) {
      console.error("File deletion failed:", error);
      return {
        message: `File deletion failed: ${error.message}`,
        status: "error",
        data: null,
      };
    }
  }
  /**
   * Deletes a file from Supabase Storage
   */
  static async deleteFile(fileUrl) {
    try {
      if (!fileUrl) return;

      // Extract file path from the public URL
      const { data, error } = await supabase.storage
        .from(SUPABASE_BUCKET_NAME)
        .remove([fileUrl]);
      if (error) throw new Error(error.message);
    } catch (error) {
      console.error(`Failed to delete file: ${error.message}`);
    }
  }
}

export default SupabaseStorageService;
