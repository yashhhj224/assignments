
import { Request, Response } from "express";
import fs from "fs";
import { HTTP_STATUS } from "../constants/httpStatus";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import { MESSAGES } from "../constants/messages";
import { ApiError } from "../utils/ApiError";
import { fileTypeFromFile } from "file-type";

export const uploadImagesController = asyncHandler(
  async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      throw new ApiError(MESSAGES.UPLOAD.NO_FILES, HTTP_STATUS.BAD_REQUEST);
    }

    const allowedTypes = [
      "image/jpeg", 
      "image/png", 
      "image/webp",
      "video/mp4",
      "video/webm"
    ];

    try {
      for (const file of files) {
        const detectedType = await fileTypeFromFile(file.path);

        if (!detectedType || !allowedTypes.includes(detectedType.mime)) {
          throw new ApiError(
            MESSAGES.ERROR.INVALID_IMAGE_FILE,
            HTTP_STATUS.BAD_REQUEST
          );
        }
      }

      const uploadedPaths = files.map((file) => `/uploads/${file.filename}`);

      return successResponse(
        res,
        HTTP_STATUS.CREATED,
        MESSAGES.UPLOAD.UPLOAD_SUCCESS,
        {
          images: uploadedPaths
        }
      );
    } catch (error) {
      for (const file of files) {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }

      throw error;
    }
  }
);
