import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },

    subjectCategory: {
      type: String,
      required: true,
      enum: [
        "math-computer-science", // Matematică-Informatică
        "natural-sciences", // Științe ale Naturii
        "philology", // Filologie
        "social-sciences", // Științe Sociale
        "technical-sciences", // Științe Tehnice
        "natural-resources-environment", // Resurse Naturale și Protecția Mediului
        "economic-sciences", // Științe Economice
        "arts", // Arte
        "sports", // Sport
        "pedagogy", // Pedagogie
      ],
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User", // References the user who created it
      default: null, // Null if it is pre-built
    },
    isMarketplaceVisible: {
      type: Boolean,
      default: false, // User decides if it's visible in the marketplace
    },
    isTemplate: {
      type: Boolean,
      default: false, // Allows users to use pre-built and marketplace subjects as templates
    },
    chapters: [
      {
        type: Types.ObjectId,
        ref: "Chapter", // References multiple chapters
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Subject = model("Subject", subjectSchema);

export default Subject;
