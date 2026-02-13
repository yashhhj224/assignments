
import express from "express";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import followRoutes from "./routes/followRoutes";
import postRoutes from "./routes/postRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { HTTP_STATUS } from "./constants/httpStatus";
import { MESSAGES } from "./constants/messages";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", followRoutes);
app.use("/api", postRoutes);
app.use("/api", uploadRoutes);

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
