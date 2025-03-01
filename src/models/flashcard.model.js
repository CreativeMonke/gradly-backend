import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const flashcardSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    studySession: {
      type: Types.ObjectId,
      ref: 'StudySession',
      default: null,
    },
    subject: {
      type: Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
    chapter: {
      type: Types.ObjectId,
      ref: 'Chapter',
      required: false,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: Schema.Types.Mixed, // Ensures Mongoose understands it's flexible JSON
      required: true,
    },
    type: {
      type: String,
      enum: ['text', 'multiple-choice'],
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    isCorrect: {
      type: Boolean,
      default: null, // Stores if the user answered correctly
    },
    lastReviewed: {
      type: Date,
      default: null,
    },
    reviewSchedule: {
      nextReviewDate: { type: Date, default: null }, // When the user should review again
      interval: { type: Number, default: 1 }, // Days until next review, increases with correct answers
    },
  },
  {
    timestamps: true,
  }
);

const Flashcard = model('Flashcard', flashcardSchema);

export default Flashcard;
