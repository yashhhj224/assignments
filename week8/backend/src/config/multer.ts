
import multer from "multer";
import path from "path";
import { ApiError } from "../utils/ApiError";
import { HTTP_STATUS } from "../constants/httpStatus";
import { UPLOAD_CONSTANTS } from "../constants/upload";
import { MESSAGES } from "../constants/messages";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${extension}`);
  }
});

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

  if (!allowedTypes.includes(file.mimetype)) {
    cb(new ApiError(MESSAGES.ERROR.ONLY_IMAGE_FILES_ALLOWED, HTTP_STATUS.BAD_REQUEST));
    return;
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: UPLOAD_CONSTANTS.MAX_FILE_SIZE_MB * 1024 * 1024,
    files: UPLOAD_CONSTANTS.MAX_FILES
  }
});
