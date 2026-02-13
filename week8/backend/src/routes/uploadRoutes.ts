
import { Router } from "express";
import { uploadImagesController } from "../controllers/uploadController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { upload } from "../config/multer";
import { UPLOAD_CONSTANTS } from "../constants/upload";

const router = Router();

router.post("/uploads", authMiddleware,
  upload.array("images", UPLOAD_CONSTANTS.MAX_FILES),
  uploadImagesController
);

export default router;
