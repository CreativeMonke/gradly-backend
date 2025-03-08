import { supabase, SUPABASE_BUCKET_NAME } from "../config/supabaseClient.js";

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
