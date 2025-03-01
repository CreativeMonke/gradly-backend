import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const studySessionSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tasks: [
      {
        type: Types.ObjectId,
        ref: 'StudyTask',
      },
    ],
    subjects: [
      {
        type: Types.ObjectId,
        ref: 'Subject',
      },
    ],
    chapters: [
      {
        type: Types.ObjectId,
        ref: 'Chapter',
      },
    ],
    viewedNotes: [
      {
        chapter: { type: Types.ObjectId, ref: 'Chapter' }, // Tracks which chapter notes the user looked at
        timeSpent: { type: Number, default: 0 }, // Time in minutes
      },
    ],
    markdownNotes: {
      type: String, // Markdown editor content
      default: '',
    },
    flashcards: [
      {
        type: Types.ObjectId,
        ref: 'Flashcard',
      },
    ],
    startTime: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endTime: {
      type: Date,
      default: null,
    },
    totalTimeSpent: {
      type: Number, // Calculated in minutes when session ends
      default: null,
    },
    focusScore: {
      type: Number, // Optional metric (0-100) based on user activity
      default: null,
    },
    sessionType: {
      type: String,
      enum: ['study', 'review', 'exam-prep'],
      default: 'study',
    },
    engagementMetrics: {
      timeSpentPerSubject: [
        {
          subject: { type: Types.ObjectId, ref: 'Subject' },
          minutes: { type: Number, default: 0 },
        }
      ],
      timeSpentPerChapter: [
        {
          chapter: { type: Types.ObjectId, ref: 'Chapter' },
          minutes: { type: Number, default: 0 },
        }
      ],
      timeSpentPerActivity: {
        notes: { type: Number, default: 0 }, // Time spent viewing/writing notes
        flashcards: { type: Number, default: 0 }, // Time spent using flashcards
        tasks: { type: Number, default: 0 }, // Time spent on tasks
      },
      flashcardStats: [
        {
          flashcardId: { type: Types.ObjectId, ref: 'Flashcard' },
          correct: { type: Boolean, required: true }, // True if answered correctly
          timestamp: { type: Date, default: Date.now },
        }
      ],
    },
  },
  {
    timestamps: true,
  }
);

const StudySession = model('StudySession', studySessionSchema);

export default StudySession;