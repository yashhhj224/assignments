
import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";
import { HTTP_STATUS } from "../constants/httpStatus";
import { comparePassword, hashPassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { isNonEmptyString, isValidEmail, isValidPassword, isValidUsername, normalizeEmail, normalizeText } from "../utils/validators";
import { MESSAGES } from "../constants/messages";

export const registerUserService = async (payload: any) => {
  if (!payload) {
    throw new ApiError(MESSAGES.ERROR.REQUEST_BODY_REQUIRED, HTTP_STATUS.BAD_REQUEST);
  }

  if (!isNonEmptyString(payload.username)) {
    throw new ApiError(MESSAGES.ERROR.USERNAME_REQUIRED, HTTP_STATUS.BAD_REQUEST);
  }

  if (!isNonEmptyString(payload.email)) {
    throw new ApiError(MESSAGES.ERROR.EMAIL_REQUIRED, HTTP_STATUS.BAD_REQUEST);
  }

  if (!isNonEmptyString(payload.password)) {
    throw new ApiError(MESSAGES.ERROR.PASSWORD_REQUIRED, HTTP_STATUS.BAD_REQUEST);
  }

  const username = normalizeText(payload.username);
  const email = normalizeEmail(payload.email);
  const password = normalizeText(payload.password);
  const profilePic = payload.profilePic ? normalizeText(payload.profilePic) : "";

  if (!isValidUsername(username)) {
    throw new ApiError(MESSAGES.ERROR.USERNAME_TOO_SHORT, HTTP_STATUS.BAD_REQUEST);
  }

  if (!isValidEmail(email)) {
    throw new ApiError(MESSAGES.ERROR.INVALID_EMAIL_FORMAT, HTTP_STATUS.BAD_REQUEST);
  }

  if (!isValidPassword(password)) {
    throw new ApiError(MESSAGES.ERROR.PASSWORD_TOO_SHORT, HTTP_STATUS.BAD_REQUEST);
  }

  const existingUserEmail = await User.findOne({ email });

  if (existingUserEmail) {
    throw new ApiError(MESSAGES.ERROR.EMAIL_ALREADY_REGISTERED, HTTP_STATUS.BAD_REQUEST);
  }

  const existingUsername = await User.findOne({ username });

  if (existingUsername) {
    throw new ApiError(MESSAGES.ERROR.USERNAME_ALREADY_TAKEN, HTTP_STATUS.BAD_REQUEST);
  }

  const hashedPassword = await hashPassword(password);

  const newUserData: any = {
    username,
    email,
    password: hashedPassword
  };

  if (profilePic && profilePic.trim() !== "") {
    newUserData.profilePic = profilePic;
  }

  const user = await User.create(newUserData);

  const token = generateToken(user._id.toString());

  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      following: user.following,
      followers: user.followers    
    }
  };
};

export const loginUserService = async (payload: any) => {
  if (!payload) {
    throw new ApiError(MESSAGES.ERROR.REQUEST_BODY_REQUIRED, HTTP_STATUS.BAD_REQUEST);
  }

  if (!isNonEmptyString(payload.email)) {
    throw new ApiError(MESSAGES.ERROR.EMAIL_REQUIRED, HTTP_STATUS.BAD_REQUEST);
  }

  if (!isNonEmptyString(payload.password)) {
    throw new ApiError(MESSAGES.ERROR.PASSWORD_REQUIRED, HTTP_STATUS.BAD_REQUEST);
  }

  const email = normalizeEmail(payload.email);
  const password = normalizeText(payload.password);

  if (!isValidEmail(email)) {
    throw new ApiError(MESSAGES.ERROR.INVALID_EMAIL_FORMAT, HTTP_STATUS.BAD_REQUEST);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(MESSAGES.ERROR.USER_NOT_REGISTERED, HTTP_STATUS.NOT_FOUND);
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new ApiError(MESSAGES.ERROR.INCORRECT_PASSWORD, HTTP_STATUS.BAD_REQUEST);
  }

  const token = generateToken(user._id.toString());

  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      following: user.following,
      followers: user.followers
    }
  };
};
