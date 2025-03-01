import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/validate", authenticateToken, (req, res) => {
  return res.json({
    message: "Token is valid.",
    status: "success",
    data: { user: req.user }, // Return decoded user data
  });
});

export default router;
