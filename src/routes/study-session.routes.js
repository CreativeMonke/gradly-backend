import express from "express";
import StudySessionController from "../controllers/study-session.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create a new study session
router.post("/", authenticateToken, StudySessionController.createSession);

// Get all study sessions with optional filters
router.get("/", authenticateToken, StudySessionController.getSessions);

// Update a study session by ID
router.put("/:id", authenticateToken, StudySessionController.updateSession);

// Delete a study session by ID
router.delete("/:id", authenticateToken, StudySessionController.deleteSession);

// End a study session
router.post("/:id/end", authenticateToken, StudySessionController.endSession);

export default router;
