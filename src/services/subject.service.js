import Subject from '../models/subject.model.js';

class SubjectService {
  /**
   * Create a new subject
   */
  static async createSubject(data) {
    try {
      const subject = new Subject(data);
      await subject.save();
      return subject;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Get subjects by filters (user-created, marketplace, etc.)
   */
  static async getSubjects(filter = {}) {
    try {
      return await Subject.find(filter);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Update a subject by ID
   */
  static async updateSubject(id, updateData) {
    try {
      return await Subject.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Delete a subject by ID
   */
  static async deleteSubject(id) {
    try {
      return await Subject.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default SubjectService;