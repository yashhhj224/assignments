
import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";
import { User } from "../models/User";
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


export const getFollowingByUserIdController = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params;

  const user = await User.findById(userId)
    .populate("following", "-password")
    .select("following");

  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: "User not found"
    });
  }

  return res.status(HTTP_STATUS.OK).json({
    success: true,
    data: user.following
  });
};
