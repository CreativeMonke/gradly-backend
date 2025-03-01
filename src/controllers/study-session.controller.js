import StudySessionService from "../services/study-session.service.js";

class StudySessionController {
  /**
   * Create a new study session
   */
  static async createSession(req, res) {
    try {
      const session = await StudySessionService.createSession(req.body);
      return res.status(201).json({ status: "success", data: session });
    } catch (error) {
      return res.status(400).json({ status: "error", message: error.message });
    }
  }

  /**
   * Get study sessions with optional filters
   */
  static async getSessions(req, res) {
    try {
      const filters = req.query;
      const sessions = await StudySessionService.getSessions(filters);
      return res.status(200).json({ status: "success", data: sessions });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  }

  /**
   * Update a study session by ID
   */
  static async updateSession(req, res) {
    try {
      const { id } = req.params;
      const updatedSession = await StudySessionService.updateSession(
        id,
        req.body
      );
      return res.status(200).json({ status: "success", data: updatedSession });
    } catch (error) {
      return res.status(400).json({ status: "error", message: error.message });
    }
  }

  /**
   * Delete a study session by ID
   */
  static async deleteSession(req, res) {
    try {
      const { id } = req.params;
      await StudySessionService.deleteSession(id);
      return res
        .status(200)
        .json({ status: "success", message: "Study session deleted" });
    } catch (error) {
      return res.status(400).json({ status: "error", message: error.message });
    }
  }

  /**
   * End a study session
   */
  static async endSession(req, res) {
    try {
      const { id } = req.params;
      const session = await StudySessionService.endSession(id);
      return res.status(200).json({ status: "success", data: session });
    } catch (error) {
      return res.status(400).json({ status: "error", message: error.message });
    }
  }
}

export default StudySessionController;
