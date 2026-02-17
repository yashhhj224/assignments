
import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";
import { HTTP_STATUS } from "../constants/httpStatus";
import {
  isNonEmptyString,
  isValidMongoId,
  normalizeText
} from "../utils/validators";
import { MESSAGES } from "../constants/messages";

export const getProfileService = async (userId: string) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new ApiError(MESSAGES.ERROR.USER_NOT_FOUND, HTTP_STATUS.BAD_REQUEST);
  }

  return user;
};

export const updateProfileService = async (userId: string, payload: any) => {
  if (!payload) {
    throw new ApiError(
      MESSAGES.ERROR.REQUEST_BODY_REQUIRED,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const updates: Record<string, string> = {};

  if (payload.username !== undefined) {
    if (!isNonEmptyString(payload.username)) {
      throw new ApiError(
        MESSAGES.ERROR.USERNAME_CANNOT_BE_EMPTY,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    updates.username = normalizeText(payload.username);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updates, {
    new: true
  }).select("-password");

  if (!updatedUser) {
    throw new ApiError(MESSAGES.ERROR.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  return updatedUser;
};

export const updateProfilePicService = async (userId: string, payload: any) => {
  if (!payload) {
    throw new ApiError(
      MESSAGES.ERROR.REQUEST_BODY_REQUIRED,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (!payload.profilePic) {
    throw new ApiError(
      MESSAGES.ERROR.PROFILE_PIC_REQUIRED,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const profilePic = normalizeText(payload.profilePic);

  if (profilePic.startsWith("data:image/")) {
    throw new ApiError(
      MESSAGES.ERROR.BASE64_NOT_ALLOWED,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (!profilePic.startsWith("/uploads/")) {
    throw new ApiError(
      MESSAGES.ERROR.INVALID_PROFILE_PIC_URL,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { profilePic },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    throw new ApiError(MESSAGES.ERROR.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  return updatedUser;
};

export const getAllUsersService = async (currentUserId: string) => {
  return User.find({ _id: { $ne: currentUserId } }).select("-password");
};

export const getUserByIdService = async (userId: string) => {
  if (!isValidMongoId(userId)) {
    throw new ApiError(MESSAGES.ERROR.INVALID_USER_ID, HTTP_STATUS.BAD_REQUEST);
  }

  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new ApiError(MESSAGES.ERROR.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  return user;
};
