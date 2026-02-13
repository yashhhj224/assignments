
import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import { getAllUsersService, getProfileService, getUserByIdService, updateProfileService } from "../services/userService";

export const getProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;

    const profile = await getProfileService(userId);

    successResponse(res, HTTP_STATUS.OK, MESSAGES.USER.PROFILE_FETCH_SUCCESS, profile);
  }
);

export const updateProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;

    const updatedUser = await updateProfileService(userId, req.body);

    successResponse(res, HTTP_STATUS.OK, MESSAGES.USER.PROFILE_UPDATE_SUCCESS, updatedUser);
  }
);

export const getAllUsersController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;

    const users = await getAllUsersService(userId);

    successResponse(res, HTTP_STATUS.OK, MESSAGES.USER.USERS_FETCH_SUCCESS, users);
  }
);

export const getUserByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await getUserByIdService(req.params.id);

    successResponse(res, HTTP_STATUS.OK, MESSAGES.USER.USER_FETCH_SUCCESS, user);
  }
);
