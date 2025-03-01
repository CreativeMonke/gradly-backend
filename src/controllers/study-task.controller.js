import StudyTaskService from '../services/study-task.service.js';

class StudyTaskController {
  /**
   * Create a new study task
   */
  static async createTask(req, res) {
    try {
      const task = await StudyTaskService.createTask(req.body);
      return res.status(201).json({ status: 'success', data: task });
    } catch (error) {
      return res.status(400).json({ status: 'error', message: error.message });
    }
  }

  /**
   * Get study tasks with optional filters
   */
  static async getTasks(req, res) {
    try {
      const filters = req.query;
      const tasks = await StudyTaskService.getTasks(filters);
      return res.status(200).json({ status: 'success', data: tasks });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }

  /**
   * Update a study task by ID
   */
  static async updateTask(req, res) {
    try {
      const { id } = req.params;
      const updatedTask = await StudyTaskService.updateTask(id, req.body);
      return res.status(200).json({ status: 'success', data: updatedTask });
    } catch (error) {
      return res.status(400).json({ status: 'error', message: error.message });
    }
  }

  /**
   * Delete a study task by ID
   */
  static async deleteTask(req, res) {
    try {
      const { id } = req.params;
      await StudyTaskService.deleteTask(id);
      return res.status(200).json({ status: 'success', message: 'Study task deleted' });
    } catch (error) {
      return res.status(400).json({ status: 'error', message: error.message });
    }
  }
}

export default StudyTaskController;