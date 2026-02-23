
import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";
import { VALIDATION_RULES } from "../constants/validation";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import { createPostService, deletePostService, getFeedService, getPostByIdService,
  updatePostService, getPostsByUserService } from "../services/postService";

export const getFeedController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;

    const page = Number(req.query.page) || VALIDATION_RULES.FEED_DEFAULT_PAGE;
    const limit = Number(req.query.limit) || VALIDATION_RULES.FEED_DEFAULT_LIMIT;

    const safePage =
      page < VALIDATION_RULES.FEED_DEFAULT_PAGE
        ? VALIDATION_RULES.FEED_DEFAULT_PAGE
        : page;

    const safeLimit =
      limit < 1
        ? VALIDATION_RULES.FEED_DEFAULT_LIMIT
        : limit > VALIDATION_RULES.FEED_MAX_LIMIT
        ? VALIDATION_RULES.FEED_MAX_LIMIT
        : limit;

    const posts = await getFeedService(userId, safePage, safeLimit);

    successResponse(res, HTTP_STATUS.OK, MESSAGES.POST.FEED_FETCHED, posts);
  }
);

export const createPostController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;

    const post = await createPostService(userId, req.body);

    successResponse(res, HTTP_STATUS.CREATED, MESSAGES.POST.POST_CREATED, post);
  }
);

export const updatePostController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;

    const updatedPost = await updatePostService(userId, req.params.id, req.body);

    successResponse(res, HTTP_STATUS.OK, MESSAGES.POST.POST_UPDATED, updatedPost);
  }
);

export const deletePostController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;

    await deletePostService(userId, req.params.id);

    successResponse(res, HTTP_STATUS.OK, MESSAGES.POST.POST_DELETED);
  }
);

export const getPostByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;
    const postId = req.params.id;

    const post = await getPostByIdService(
      userId,
      postId
    );

    successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.POST.POST_FETCHED,
      post
    );
  }
);

export const getPostsByUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const currentUserId = req.userId as string;
    const profileUserId = req.params.userId;

    const page =
      Number(req.query.page) ||
      VALIDATION_RULES.FEED_DEFAULT_PAGE;

    const limit =
      Number(req.query.limit) ||
      VALIDATION_RULES.FEED_DEFAULT_LIMIT;

    const safePage =
      page < VALIDATION_RULES.FEED_DEFAULT_PAGE
        ? VALIDATION_RULES.FEED_DEFAULT_PAGE
        : page;

    const safeLimit =
      limit < 1
        ? VALIDATION_RULES.FEED_DEFAULT_LIMIT
        : limit > VALIDATION_RULES.FEED_MAX_LIMIT
        ? VALIDATION_RULES.FEED_MAX_LIMIT
        : limit;

    const posts = await getPostsByUserService(
      currentUserId,
      profileUserId,
      safePage,
      safeLimit
    );

    successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.POST.USER_POSTS_FETCHED,
      posts
    );
  }
);
