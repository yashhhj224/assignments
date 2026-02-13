
import { Request, Response, NextFunction } from "express";
import { Post } from "../models/Post";
import { ApiError } from "../utils/ApiError";
import { HTTP_STATUS } from "../constants/httpStatus";
import { isValidMongoId } from "../utils/validators";
import { MESSAGES } from "../constants/messages";

export const postOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.userId as string;
  const postId = req.params.id;

  if (!isValidMongoId(postId)) {
    next(new ApiError(MESSAGES.ERROR.INVALID_POST_ID, HTTP_STATUS.BAD_REQUEST));
    return;
  }

  const post = await Post.findById(postId);

  if (!post) {
    next(new ApiError(MESSAGES.ERROR.POST_NOT_FOUND, HTTP_STATUS.NOT_FOUND));
    return;
  }

  if (post.author.toString() !== userId) {
    next(new ApiError(MESSAGES.ERROR.FORBIDDEN, HTTP_STATUS.FORBIDDEN));
    return;
  }

  next();
};
