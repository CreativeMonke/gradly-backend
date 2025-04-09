import SupabaseStorageService from "../services/supabaseStorage.service.js";

class FileController {
  /**
   * Delete files from Supabase if they are not linked to any entity
   */
  static async deleteFiles(req, res) {
    try {
      const { fileUrls, type, filters, inUse } = req.body;

      if (!Array.isArray(fileUrls) || fileUrls.length === 0) {
        return res.status(400).json({
          status: "error",
          message: "No file URLs provided for deletion.",
        });
      }

      const result = await SupabaseStorageService.deleteFiles({
        fileUrls,
        type,
        filters,
        inUse,
      });

      return res.status(result.status === "success" ? 200 : 500).json(result);
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message || "File deletion failed.",
      });
    }
  }
}

export default FileController;
