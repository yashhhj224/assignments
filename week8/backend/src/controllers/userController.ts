
import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import {
  getAllUsersService,
  getProfileService,
  updateProfileService,
  updateProfilePicService,
  searchUsersService,
  changePasswordService,
  getUserByIdService
} from "../services/userService";
import { ApiError } from "../utils/ApiError";
import { isValidMongoId } from "../utils/validators";

export const getProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;

    const profile = await getProfileService(userId);

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.USER.PROFILE_FETCH_SUCCESS,
      profile
    );
  }
);

export const updateProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;

    const updatedUser = await updateProfileService(userId, req.body);

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.USER.PROFILE_UPDATE_SUCCESS,
      updatedUser
    );
  }
);

export const updateProfilePicController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;

    const updatedUser = await updateProfilePicService(userId, req.body);

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.USER.PROFILE_PIC_UPDATE_SUCCESS,
      updatedUser
    );
  }
);

export const getAllUsersController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;

    const users = await getAllUsersService(userId);

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.USER.USERS_FETCH_SUCCESS,
      users
    );
  }
);

export const getUserByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId || !isValidMongoId(userId)) {
      throw new ApiError(
        MESSAGES.ERROR.INVALID_USER_ID,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const user = await getUserByIdService(userId);

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.USER.PROFILE_FETCH_SUCCESS,
      user
    );
  }
);

export const searchUsersController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;
    const query = req.query.query as string;

    const users = await searchUsersService(query, userId);

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.USER.USERS_FETCH_SUCCESS,
      users
    );
  }
);

export const changePasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;
    const { currentPassword, newPassword } = req.body;

    await changePasswordService(userId, currentPassword, newPassword);

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.USER.PASSWORD_UPDATE_SUCCESS
    );
  }
);