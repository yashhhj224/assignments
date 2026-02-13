
import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";
import { HTTP_STATUS } from "../constants/httpStatus";
import { isValidMongoId } from "../utils/validators";
import { MESSAGES } from "../constants/messages";

export const followUserService = async (currentUserId: string, targetUserId: string) => {
  if (!isValidMongoId(targetUserId)) {
    throw new ApiError(MESSAGES.ERROR.INVALID_USER_ID, HTTP_STATUS.BAD_REQUEST);
  }

  if (currentUserId === targetUserId) {
    throw new ApiError(MESSAGES.ERROR.YOU_CANNOT_FOLLOW_YOURSELF, HTTP_STATUS.BAD_REQUEST);
  }

  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetUserId);

  if (!currentUser || !targetUser) {
    throw new ApiError(MESSAGES.ERROR.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  const alreadyFollowing = currentUser.following.some(
    (id) => id.toString() === targetUserId
  );

  if (alreadyFollowing) {
    throw new ApiError(MESSAGES.ERROR.ALREADY_FOLLOWING, HTTP_STATUS.BAD_REQUEST);
  }

  currentUser.following.push(targetUser._id);
  targetUser.followers.push(currentUser._id);

  await currentUser.save();
  await targetUser.save();

  return true;
};

export const unfollowUserService = async (currentUserId: string, targetUserId: string) => {
  if (!isValidMongoId(targetUserId)) {
    throw new ApiError(MESSAGES.ERROR.INVALID_USER_ID, HTTP_STATUS.BAD_REQUEST);
  }

  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetUserId);

  if (!currentUser || !targetUser) {
    throw new ApiError(MESSAGES.ERROR.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  const isFollowing = currentUser.following.some(
    (id) => id.toString() === targetUserId
  );

  if (!isFollowing) {
    throw new ApiError(MESSAGES.ERROR.NOT_FOLLOWING, HTTP_STATUS.BAD_REQUEST);
  }

  currentUser.following = currentUser.following.filter(
    (id) => id.toString() !== targetUserId
  );

  targetUser.followers = targetUser.followers.filter(
    (id) => id.toString() !== currentUserId
  );

  await currentUser.save();
  await targetUser.save();

  return true;
};

export const getFollowingService = async (currentUserId: string) => {
  const user = await User.findById(currentUserId).populate("following", "-password");

  if (!user) {
    throw new ApiError(MESSAGES.ERROR.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  return user.following;
};

export const getFollowersService = async (userId: string) => {
  if (!isValidMongoId(userId)) {
    throw new ApiError(MESSAGES.ERROR.INVALID_USER_ID, HTTP_STATUS.BAD_REQUEST);
  }

  const user = await User.findById(userId).populate("followers", "-password");

  if (!user) {
    throw new ApiError(MESSAGES.ERROR.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  return user.followers;
};
