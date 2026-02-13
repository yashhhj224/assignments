
import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import { followUserService, getFollowersService, getFollowingService, unfollowUserService } from "../services/followService";

export const followUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;

    await followUserService(userId, req.params.userId);

    successResponse(res, HTTP_STATUS.OK, MESSAGES.FOLLOW.FOLLOW_SUCCESS);
  }
);

export const unfollowUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;

    await unfollowUserService(userId, req.params.userId);

    successResponse(res, HTTP_STATUS.OK, MESSAGES.FOLLOW.UNFOLLOW_SUCCESS);
  }
);

export const getFollowingController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;

    const following = await getFollowingService(userId);

    successResponse(res, HTTP_STATUS.OK, MESSAGES.FOLLOW.FOLLOWING_FETCH_SUCCESS, following);
  }
);

export const getFollowersController = asyncHandler(
  async (req: Request, res: Response) => {
    const followers = await getFollowersService(req.params.userId);

    successResponse(res, HTTP_STATUS.OK, MESSAGES.FOLLOW.FOLLOWERS_FETCH_SUCCESS, followers);
  }
);
