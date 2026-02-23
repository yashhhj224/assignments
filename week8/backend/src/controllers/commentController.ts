
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import { HTTP_STATUS } from "../constants/httpStatus";
import {
  createCommentService,
  deleteCommentService,
  getCommentsByPostService
} from "../services/commentService";

export const createCommentController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;

    const comment = await createCommentService(
      userId,
      req.params.postId,
      req.body.content
    );

    successResponse(res, HTTP_STATUS.CREATED, "Comment created", comment);
  }
);

export const deleteCommentController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;

    await deleteCommentService(userId, req.params.commentId);

    successResponse(res, HTTP_STATUS.OK, "Comment deleted");
  }
);

export const getCommentsController = asyncHandler(
  async (req: Request, res: Response) => {
    const comments = await getCommentsByPostService(req.params.postId);

    successResponse(res, HTTP_STATUS.OK, "Comments fetched", comments);
  }
);
