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

      if (error) throw new Error(error.message);

      return {
        filename: file.originalname,
        fileType: file.mimetype,
        fileUrl: `${
          supabase.storage.from(SUPABASE_BUCKET_NAME).getPublicUrl(data.path)
            .publicUrl
        }`,
        uploadedAt: new Date(),
      };
    } catch (error) {
      throw new Error(`File upload failed: ${error.message}`);
    }
  }
}

export default SupabaseStorageService;
