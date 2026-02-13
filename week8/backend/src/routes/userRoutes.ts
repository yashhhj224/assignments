
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getAllUsersController, getProfileController, getUserByIdController, updateProfileController } from "../controllers/userController";

const router = Router();

router.get("/profile", authMiddleware, getProfileController);
router.put("/profile", authMiddleware, updateProfileController);
router.get("/users", authMiddleware, getAllUsersController);
router.get("/users/:id", authMiddleware, getUserByIdController);

export default router;
