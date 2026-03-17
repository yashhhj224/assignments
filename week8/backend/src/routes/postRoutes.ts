
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createPostController, deletePostController, getFeedController, getPostByIdController, updatePostController, getPostsByUserController } from "../controllers/postController";
import { postOwnerMiddleware } from "../middlewares/postOwnerMiddleware";
import { upload } from "../config/multer";

const router = Router();

router.get("/posts/feed", authMiddleware, getFeedController);
router.post("/posts", authMiddleware, upload.array("media", 10), createPostController);
router.put("/posts/:id", authMiddleware, postOwnerMiddleware, updatePostController);
router.delete("/posts/:id", authMiddleware, postOwnerMiddleware, deletePostController);
router.get("/posts/user/:userId", authMiddleware, getPostsByUserController);
router.get("/posts/:id", authMiddleware, getPostByIdController);

export default router;
