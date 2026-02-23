
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { toggleLikeController } from "../controllers/likeController";

const router = Router();

router.post("/posts/:postId/like", authMiddleware, toggleLikeController);

export default router;
