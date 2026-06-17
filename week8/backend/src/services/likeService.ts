
import { Like } from "../models/Like";
import { Post } from "../models/Post";
import { ApiError } from "../utils/ApiError";
import { HTTP_STATUS } from "../constants/httpStatus";
import { isValidMongoId } from "../utils/validators";
import { MESSAGES } from "../constants/messages";
import { createNotificationService } from "./notificationService";
import { getIO } from "../socket";
import { getUnreadNotificationCountService } from "./notificationService";

export const toggleLikeService = async (
  userId: string,
  postId: string
) => {
  if (!isValidMongoId(postId)) {
    throw new ApiError(MESSAGES.ERROR.INVALID_POST_ID, HTTP_STATUS.BAD_REQUEST);
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(MESSAGES.ERROR.POST_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  const existingLike = await Like.findOne({
    post: postId,
    user: userId
  });

  if (existingLike) {
    await Like.deleteOne({ _id: existingLike._id });
    await Post.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });

    return { liked: false };
  }

  await Like.create({
    post: postId,
    user: userId
  });

  if (post.author.toString() !== userId) {
    const notification = await createNotificationService(
      post.author.toString(),
      userId,
      "LIKE",
      postId
    );

    if (notification) {
      const io = getIO();

      io.to(post.author.toString()).emit(
        "new_notification",
        notification
      );

      const unreadData = 
        await getUnreadNotificationCountService(
          post.author.toString()
        );

        io.to(post.author.toString()).emit(
          "notification_unread_updated",
          unreadData
        );
    }
  }

  await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });

  return { liked: true };
};

export const getPostLikesService = async (postId: string) => {
  if (!isValidMongoId(postId)) {
    throw new ApiError(MESSAGES.ERROR.INVALID_POST_ID, HTTP_STATUS.BAD_REQUEST);
  }

  return Like.find({ post: postId })
    .populate("user", "-password")
    .sort({ createdAt: -1 });
};
