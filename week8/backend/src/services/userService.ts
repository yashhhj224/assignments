
import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";
import { HTTP_STATUS } from "../constants/httpStatus";
import {
  isNonEmptyString,
  isValidMongoId,
  normalizeText,
  normalizeEmail
} from "../utils/validators";
import { MESSAGES } from "../constants/messages";
import { comparePassword, hashPassword } from "../utils/hash";
import { VALIDATION_RULES } from "../constants/validation";

export const getProfileService = async (userId: string) => {
  const user = await User.findById(userId)
    .select("-password")
    .populate("followers", "-password")
    .populate("following", "-password");

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  const userObj = user.toObject();

  return {
    ...userObj,
    followersCount: userObj.followers?.length || 0,
    followingCount: userObj.following?.length || 0
  };
};

export const updateProfileService = async (
  userId: string,
  payload: any,
  file?: Express.Multer.File
) => {
  if (!payload && !file) {
    throw new ApiError(
      MESSAGES.ERROR.REQUEST_BODY_REQUIRED,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(
      MESSAGES.ERROR.USER_NOT_FOUND,
      HTTP_STATUS.NOT_FOUND
    );
  }

  if (payload.username !== undefined) {
    if (!isNonEmptyString(payload.username)) {
      throw new ApiError(
        MESSAGES.ERROR.USERNAME_CANNOT_BE_EMPTY,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const normalizedUsername = normalizeText(payload.username);

    const existingUser = await User.findOne({
      username: normalizedUsername,
      _id: { $ne: userId }
    });

    if (existingUser) {
      throw new ApiError(
        "Username already taken",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    user.username = normalizedUsername;
  }

  if (payload.email !== undefined) {
    if (!isNonEmptyString(payload.email)) {
      throw new ApiError(
        MESSAGES.ERROR.EMAIL_REQUIRED,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const normalizedEmail = normalizeEmail(payload.email);

    const existingEmail = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: userId }
    });

    if (existingEmail) {
      throw new ApiError(
        "Email already in use",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    user.email = normalizedEmail;
  }

  if (file) {
    user.profilePic = file.path;
  }

  await user.save();

  const updatedUser = await User.findById(userId)
    .select("-password")
    .populate("followers", "-password")
    .populate("following", "-password");

  if (!updatedUser) {
    throw new ApiError(
      MESSAGES.ERROR.USER_NOT_FOUND,
      HTTP_STATUS.NOT_FOUND
    );
  }

  const userObj = updatedUser.toObject();

  return {
    ...userObj,
    followersCount: userObj.followers?.length || 0,
    followingCount: userObj.following?.length || 0
  };
};

export const getAllUsersService = async (currentUserId: string) => {
  return User.find({ _id: { $ne: currentUserId } }).select("-password");
};

export const getUserByIdService = async (userId: string) => {
  if (!isValidMongoId(userId)) {
    throw new ApiError(
      MESSAGES.ERROR.INVALID_USER_ID,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const user = await User.findById(userId)
    .select("-password")
    .populate("followers", "-password")
    .populate("following", "-password");

  if (!user) {
    throw new ApiError(
      MESSAGES.ERROR.USER_NOT_FOUND,
      HTTP_STATUS.NOT_FOUND
    );
  }

  const userObj = user.toObject();

  return {
    ...userObj,
    followersCount: userObj.followers?.length || 0,
    followingCount: userObj.following?.length || 0
  };
};

export const searchUsersService = async (
  query: string,
  currentUserId: string
) => {
  return User.find({
    username: { $regex: query, $options: "i" },
    _id: { $ne: currentUserId }
  }).select("-password");
};

export const changePasswordService = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(MESSAGES.ERROR.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  const isMatch = await comparePassword(currentPassword, user.password);

  if (!isMatch) {
    throw new ApiError("Current password is incorrect", HTTP_STATUS.BAD_REQUEST);
  }

  if (newPassword.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    throw new ApiError("New password too short", HTTP_STATUS.BAD_REQUEST);
  }

  user.password = await hashPassword(newPassword);
  await user.save();

  return true;
};
