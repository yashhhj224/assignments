
import { Comment } from "../models/Comment";
import { Post } from "../models/Post";
import { ApiError } from "../utils/ApiError";
import { HTTP_STATUS } from "../constants/httpStatus";
import { isValidMongoId, isNonEmptyString, normalizeText } from "../utils/validators";
import { MESSAGES } from "../constants/messages";
import { createNotificationService, getUnreadNotificationCountService } from "./notificationService";
import { getIO } from "../socket"; 

export const createCommentService = async (
  userId: string,
  postId: string,
  content: string
) => {
  if (!isValidMongoId(postId)) {
    throw new ApiError(
      MESSAGES.ERROR.INVALID_POST_ID,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (!isNonEmptyString(content)) {
    throw new ApiError(
      "Comment content required",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(
      MESSAGES.ERROR.POST_NOT_FOUND,
      HTTP_STATUS.NOT_FOUND
    );
  }

  const comment = await Comment.create({
    post: postId,
    user: userId,
    content: normalizeText(content)
  });

  await Post.findByIdAndUpdate(postId, {
    $inc: { commentsCount: 1 }
  });

  const populatedComment = await comment.populate("user", "-password");

  if (post.author.toString() !== userId) {
    const notification = await createNotificationService(
      post.author.toString(),
      userId,
      "COMMENT",
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

  return populatedComment;
};

export const deleteCommentService = async (
  userId: string,
  commentId: string
) => {
  if (!isValidMongoId(commentId)) {
    throw new ApiError("Invalid comment id", HTTP_STATUS.BAD_REQUEST);
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError("Comment not found", HTTP_STATUS.NOT_FOUND);
  }

  if (comment.user.toString() !== userId) {
    throw new ApiError(MESSAGES.ERROR.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
  }

  await Comment.findByIdAndDelete(commentId);

  await Post.findByIdAndUpdate(comment.post, {
    $inc: { commentsCount: -1 }
  });

  return true;
};

export const getCommentsByPostService = async (
  postId: string
) => {
  if (!isValidMongoId(postId)) {
    throw new ApiError(MESSAGES.ERROR.INVALID_POST_ID, HTTP_STATUS.BAD_REQUEST);
  }

  return Comment.find({ post: postId })
    .populate("user", "-password")
    .sort({ createdAt: -1 });
};
