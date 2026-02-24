
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  getAllUsersController,
  getProfileController,
  getUserByIdController,
  updateProfileController,
  changePasswordController,
  searchUsersController
} from "../controllers/userController";
import { upload } from "../middlewares/uploadMiddleware";

const router = Router();

router.get("/profile", authMiddleware, getProfileController);

router.put("/profile", authMiddleware, upload.single("profilePic"), updateProfileController);
router.get("/users", authMiddleware, getAllUsersController);

router.get("/users/search", authMiddleware, searchUsersController);

router.get("/users/:userId", authMiddleware, getUserByIdController);

router.put("/change-password", authMiddleware, changePasswordController);

export default router;