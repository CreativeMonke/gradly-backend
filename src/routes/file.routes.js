import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import FileController from "../controllers/file.controller.js";

const router = express.Router();

// Delete files from Supabase
router.delete("/", authenticateToken, FileController.deleteFiles);

export default router;
