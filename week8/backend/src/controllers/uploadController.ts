
import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import { MESSAGES } from "../constants/messages";

export const uploadImagesController = asyncHandler(
  async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];

    const uploadedPaths = files.map((file) => `/uploads/${file.filename}`);

    successResponse(res, HTTP_STATUS.CREATED, MESSAGES.UPLOAD.UPLOAD_SUCCESS, {
        images: uploadedPaths
    });
  }
);
