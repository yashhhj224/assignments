
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { toggleLikeService } from "../services/likeService";
import { successResponse } from "../utils/response";
import { HTTP_STATUS } from "../constants/httpStatus";

export const toggleLikeController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;

    const result = await toggleLikeService(userId, req.params.postId);

    successResponse(res, HTTP_STATUS.OK, "Like toggled successfully", result);
  }
);
