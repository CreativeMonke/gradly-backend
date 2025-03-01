import StudySession from "../models/study-session.model.js";

class StudySessionService {
  /**
   * Create a new study session
   */
  static async createSession(data) {
    try {
      const session = new StudySession(data);
      await session.save();
      return session;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Get study sessions by filters (user, subject, etc.)
   */
  static async getSessions(filter = {}) {
    try {
      return await StudySession.find(filter).populate(
        "tasks subjects chapters flashcards"
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Update a study session
   */
  static async updateSession(id, updateData) {
    try {
      return await StudySession.findByIdAndUpdate(id, updateData, {
        new: true,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Delete a study session
   */
  static async deleteSession(id) {
    try {
      return await StudySession.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * End a study session and calculate total time spent
   */
  static async endSession(sessionId) {
    try {
      const session = await StudySession.findById(sessionId);
      if (!session) throw new Error("Study session not found");

      session.endTime = new Date();
      session.totalTimeSpent = Math.round(
        (session.endTime - session.startTime) / 60000
      ); // Convert to minutes
      await session.save();
      return session;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default StudySessionService;
