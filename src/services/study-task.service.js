import StudyTask from '../models/study-task.model.js';

class StudyTaskService {
  /**
   * Create a new study task
   */
  static async createTask(data) {
    try {
      const task = new StudyTask(data);
      await task.save();
      return task;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Get study tasks by filters (user, subject, etc.)
   */
  static async getTasks(filter = {}) {
    try {
      return await StudyTask.find(filter).populate('subject chapters');
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Update a study task
   */
  static async updateTask(id, updateData) {
    try {
      return await StudyTask.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Delete a study task
   */
  static async deleteTask(id) {
    try {
      return await StudyTask.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default StudyTaskService;
