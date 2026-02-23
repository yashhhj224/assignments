
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createCommentController,
  deleteCommentController,
  getCommentsController
} from "../controllers/commentController";

const router = Router();

router.post("/posts/:postId/comments", authMiddleware, createCommentController);
router.delete("/comments/:commentId", authMiddleware, deleteCommentController);
router.get("/posts/:postId/comments", authMiddleware, getCommentsController);

export default router;
