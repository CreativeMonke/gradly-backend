import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const studyTaskSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['homework', 'exam'],
    },
    subject: {
      type: Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
    chapters: [
      {
        type: Types.ObjectId,
        ref: 'Chapter',
      },
    ],
    dueDate: {
      type: Date,
      required: true,
    },
    examType: {
      type: String,
      enum: ['final', 'midterm', 'quiz', 'admission'],
      default: null, // Only applies if type is 'exam'
    },
    estimatedTime: {
      type: Number, // Estimated duration in minutes, AI-generated based on previous tasks
      default: null,
    },
    actualTime: {
      type: Number, // Actual time spent in minutes, tracked when completed
      default: null,
    },
    studySessionLog: [
      {
        session: { type: Types.ObjectId, ref: 'StudySession' },
        startTime: Date,
        endTime: Date,
      }
    ],
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completionDate: {
      type: Date,
      default: null,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
  },
  {
    timestamps: true,
  }
);

const StudyTask = model('StudyTask', studyTaskSchema);

export default StudyTask;
