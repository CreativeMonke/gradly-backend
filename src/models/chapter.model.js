import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const chapterSchema = new Schema(
  {
    subjectId: {
      type: Types.ObjectId,
      ref: "Subject",
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
    materials: [
      {
        filename: String, // Original filename
        fileType: String, // MIME type (e.g., "application/pdf")
        fileUrl: String, // URL from Supabase,
        filePublicUrl: String, // Public URL from Supabase
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    markdownContent: {
      type: String, // Stores markdown text created directly in the editor
      default: "",
    },
    aiSummary: {
      type: String,
      default: null,
    },
    aiNotes: {
      type: Schema.Types.Mixed, // Ensures Mongoose understands it's flexible JSON
      default: {},
    },
    userNotes: {
      type: Schema.Types.Mixed, // Ensures Mongoose understands it's flexible JSON
      default: {},
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    currentProgress: {
      type: Number,
      default: 0,
    },
    completionDate: {
      type: Date,
      default: null, // Stores the date when the chapter is marked complete
    },
  },
  {
    timestamps: true,
  }
);

const Chapter = model("Chapter", chapterSchema);

export default Chapter;
