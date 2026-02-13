
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { followUserController, getFollowersController, getFollowingController, unfollowUserController } from "../controllers/followController";

const router = Router();

router.post("/follow/:userId", authMiddleware, followUserController);
router.delete("/follow/:userId", authMiddleware, unfollowUserController);
router.get("/following", authMiddleware, getFollowingController);
router.get("/followers/:userId", authMiddleware, getFollowersController);

export default router;
