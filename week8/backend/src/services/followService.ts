
import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";
import { HTTP_STATUS } from "../constants/httpStatus";
import { isValidMongoId } from "../utils/validators";
import { MESSAGES } from "../constants/messages";
import { createNotificationService, getUnreadNotificationCountService } from "./notificationService";
import { getIO } from "../socket"; 

export const followUserService = async (
  currentUserId: string,
  targetUserId: string
) => {
  if (currentUserId === targetUserId) {
    throw new Error("You cannot follow yourself");
  }

  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetUserId);

  if (!currentUser || !targetUser) {
    throw new Error("User not found");
  }

  if (currentUser.following.includes(targetUser._id)) {
    return;
  }

  if (currentUserId === targetUserId) {
    throw new ApiError(
      "You cannot follow yourself",
      HTTP_STATUS.BAD_REQUEST
    );
  }
  
  currentUser.following.push(targetUser._id);
  targetUser.followers.push(currentUser._id);

  await currentUser.save();
  await targetUser.save();

  const notification = await createNotificationService(
    targetUserId,
    currentUserId,
    "FOLLOW"
  );

  if (notification) {
    const io = getIO();

    io.to(targetUserId).emit("new_notification", notification);

    const unreadData = 
      await getUnreadNotificationCountService(targetUserId);
    
    io.to(targetUserId).emit(
      "notification_unread_updated",
      unreadData
    );
  }
};

export const unfollowUserService = async (
  currentUserId: string,
  targetUserId: string
) => {
  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetUserId);

  if (!currentUser || !targetUser) {
    throw new Error("User not found");
  }

  currentUser.following = currentUser.following.filter(
    (id) => id.toString() !== targetUserId
  );

  targetUser.followers = targetUser.followers.filter(
    (id) => id.toString() !== currentUserId
  );

  await currentUser.save();
  await targetUser.save();
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
