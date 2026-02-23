
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  getAllUsersController,
  getProfileController,
  getUserByIdController,
  updateProfileController,
  updateProfilePicController,
  changePasswordController
} from "../controllers/userController";
import { searchUsersController } from "../controllers/userController";

const router = Router();

router.get("/profile", authMiddleware, getProfileController);
router.put("/profile", authMiddleware, updateProfileController);

router.put("/profile/picture", authMiddleware, updateProfilePicController);

router.get("/users", authMiddleware, getAllUsersController);

router.get("/users/search", authMiddleware, searchUsersController);

router.get("/users/:userId", authMiddleware, getUserByIdController);

router.put("/change-password", authMiddleware, changePasswordController);

export default router;
