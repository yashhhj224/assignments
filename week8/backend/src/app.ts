
import express from "express";
import cors from "cors";
import path from "path";
import likeRoutes from "./routes/likeRoutes";
import commentRoutes from "./routes/commentRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import followRoutes from "./routes/followRoutes";
import postRoutes from "./routes/postRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { HTTP_STATUS } from "./constants/httpStatus";
import { MESSAGES } from "./constants/messages";
import chatRoutes from "./routes/chatRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import groupChatRoutes from "./routes/groupChatRoutes";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json({ limit: "1mb" }));

const uploadsPath = path.join(__dirname, "..", "uploads");

app.use("/uploads", express.static(uploadsPath));

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", followRoutes);
app.use("/api", postRoutes);
app.use("/api", likeRoutes);
app.use("/api", commentRoutes);
app.use("/api", uploadRoutes);
app.use("/api", chatRoutes);
app.use("/api", groupChatRoutes);
app.use("/api", notificationRoutes);

app.use((req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    statusCode: HTTP_STATUS.NOT_FOUND,
    message: MESSAGES.ROUTE.NOT_FOUND,
    errors: []
  });
});

app.use(errorMiddleware);

export default app;
