import SubjectService from "../services/subject.service.js";

class SubjectController {
  /**
   * Create a new subject
   */
  static async createSubject(req, res) {
    try {
      const { userId } = req.user; // Extract userId from the authenticated user

      const subjectData = {
        ...req.body,
        createdBy: userId, // Set createdBy to the authenticated user ID
      };

      const subject = await SubjectService.createSubject(subjectData);

      return res.status(201).json({
        status: "success",
        message: "Subject created successfully",
        data: subject,
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  /**
   * Get subjects with optional filters
   */
  static async getSubjects(req, res) {
    try {
      console.log(req.query, "1");
      const filters = req.query;
      const subjects = await SubjectService.getSubjects(filters);
      return res.status(200).json({ status: "success", data: subjects });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  }

  /**
   * Update a subject by ID
   */
  static async updateSubject(req, res) {
    try {
      const { id } = req.params;
      const updatedSubject = await SubjectService.updateSubject(id, req.body);
      return res
        .status(200)
        .json({
          status: "success",
          message: "Subject updated successfully",
          data: updatedSubject,
        });
    } catch (error) {
      return res.status(400).json({ status: "error", message: error.message });
    }
  }

  /**
   * Delete a subject by ID
   */
  static async deleteSubject(req, res) {
    try {
      const { id } = req.params;
      const deletedSubject = await SubjectService.deleteSubject(id);
      return res
        .status(200)
        .json({
          status: "success",
          message: "Subject deleted",
          data: deletedSubject,
        });
    } catch (error) {
      return res.status(400).json({ status: "error", message: error.message });
    }
  }
}

export default SubjectController;
