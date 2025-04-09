import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import flashcardRoutes from "./routes/flashcard.routes.js";
import studySessionRoutes from "./routes/study-session.routes.js";
import studyTaskRoutes from "./routes/study-task.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import chapterRoutes from "./routes/chapter.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import fileRoutes from "./routes/file.routes.js";
dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://gradly-one.vercel.app",
  "http://192.168.100.13:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/flashcards", flashcardRoutes);
app.use("/study-sessions", studySessionRoutes);
app.use("/study-tasks", studyTaskRoutes);
app.use("/subjects", subjectRoutes);
app.use("/chapters", chapterRoutes);
app.use('/ai', aiRoutes);
app.use("/files", fileRoutes);
// Default Route
app.get("/", (req, res) => {
  res.send("Gradly Backend v0.2 is running!");
});

export default app;
