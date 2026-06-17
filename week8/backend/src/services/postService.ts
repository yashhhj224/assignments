
import mongoose from "mongoose";
import { Post } from "../models/Post";
import { User } from "../models/User";
import { Like } from "../models/Like";
import { ApiError } from "../utils/ApiError";
import { HTTP_STATUS } from "../constants/httpStatus";
import { VALIDATION_RULES } from "../constants/validation";
import {
  isNonEmptyString,
  isValidMongoId,
  normalizeTags,
  normalizeText
} from "../utils/validators";
import { MESSAGES } from "../constants/messages";

export const createPostService = async (
  userId: string,
  payload: any,
  files?: Express.Multer.File[]
) => {
  if (!payload) {
    throw new ApiError(
      MESSAGES.ERROR.REQUEST_BODY_REQUIRED,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (!isNonEmptyString(payload.title)) {
    throw new ApiError(
      MESSAGES.ERROR.TITLE_REQUIRED,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (!isNonEmptyString(payload.content)) {
    throw new ApiError(
      MESSAGES.ERROR.CONTENT_REQUIRED,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const title = normalizeText(payload.title);
  const content = normalizeText(payload.content);
  const tags = normalizeTags(payload.tags);

  let media: { type: "IMAGE" | "VIDEO"; url: string }[] = [];

  if (files && files.length > 0) {
    media = files.map((file) => {
      const mime = file.mimetype;

      if (mime.startsWith("image/")) {
        return {
          type: "IMAGE",
          url: `/uploads/${file.filename}`
        };
      }

      if (mime.startsWith("video/")) {
        return {
          type: "VIDEO",
          url: `/uploads/${file.filename}`
        };
      }

      throw new ApiError(
        "Unsupported media type",
        HTTP_STATUS.BAD_REQUEST
      );
    });
  }

  if (title.length < VALIDATION_RULES.POST_TITLE_MIN_LENGTH) {
    throw new ApiError(
      MESSAGES.ERROR.TITLE_TOO_SHORT,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (content.length < VALIDATION_RULES.POST_CONTENT_MIN_LENGTH) {
    throw new ApiError(
      MESSAGES.ERROR.CONTENT_TOO_SHORT,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const post = await Post.create({
    author: userId,
    title,
    content,
    media,
    tags
  });

  const populatedPost = await Post.findById(post._id)
    .populate("author", "-password");

  return {
    ...populatedPost!.toObject(),
    isLikedByCurrentUser: false
  };
};

export const updatePostService = async (
  userId: string,
  postId: string,
  payload: any
) => {
  if (!isValidMongoId(postId)) {
    throw new ApiError(
      MESSAGES.ERROR.INVALID_POST_ID,
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

  if (post.author.toString() !== userId) {
    throw new ApiError(
      MESSAGES.ERROR.FORBIDDEN,
      HTTP_STATUS.FORBIDDEN
    );
  }

  if (payload.title !== undefined) {
    if (!isNonEmptyString(payload.title)) {
      throw new ApiError(
        MESSAGES.ERROR.TITLE_CANNOT_BE_EMPTY,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const title = normalizeText(payload.title);

    if (title.length < VALIDATION_RULES.POST_TITLE_MIN_LENGTH) {
      throw new ApiError(
        MESSAGES.ERROR.TITLE_TOO_SHORT,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    post.title = title;
  }

  if (payload.content !== undefined) {
    if (!isNonEmptyString(payload.content)) {
      throw new ApiError(
        MESSAGES.ERROR.CONTENT_CANNOT_BE_EMPTY,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const content = normalizeText(payload.content);

    if (content.length < VALIDATION_RULES.POST_CONTENT_MIN_LENGTH) {
      throw new ApiError(
        MESSAGES.ERROR.CONTENT_TOO_SHORT,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    post.content = content;
  }

  if (payload.tags !== undefined) {
    post.tags = normalizeTags(payload.tags);
  }

  await post.save();

  const updatedPost = await Post.findById(postId)
    .populate("author", "-password");

  const isLiked = await Like.exists({
    post: postId,
    user: userId
  });

  return {
    ...updatedPost!.toObject(),
    isLikedByCurrentUser: !!isLiked
  };
};

export const deletePostService = async (
  userId: string,
  postId: string
) => {
  if (!isValidMongoId(postId)) {
    throw new ApiError(
      MESSAGES.ERROR.INVALID_POST_ID,
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

  if (post.author.toString() !== userId) {
    throw new ApiError(
      MESSAGES.ERROR.FORBIDDEN,
      HTTP_STATUS.FORBIDDEN
    );
  }

  await Post.findByIdAndDelete(postId);

  return true;
};

export const getPostByIdService = async (
  userId: string,
  postId: string
) => {
  const post = await Post.findById(postId)
    .populate("author", "-password");

  if (!post) {
    throw new ApiError("Post not found", 404);
  }

  const isLiked = await Like.exists({
    post: postId,
    user: userId
  });

  return {
    ...post.toObject(),
    isLikedByCurrentUser: !!isLiked
  };
};

export const getFeedService = async (
  userId: string,
  page: number,
  limit: number
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(
      MESSAGES.ERROR.USER_NOT_FOUND,
      HTTP_STATUS.NOT_FOUND
    );
  }

  const followingIds = user.following.map((id) =>
    new mongoose.Types.ObjectId(id.toString())
  );

  const authorIds = [
    ...followingIds,
    new mongoose.Types.ObjectId(userId)
  ];

  const skip =
    (page - VALIDATION_RULES.FEED_DEFAULT_PAGE) * limit;

  const posts = await Post.aggregate([
    { $match: { author: { $in: authorIds } } },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "post",
        as: "likesData"
      }
    },
    {
      $addFields: {
        isLikedByCurrentUser: {
          $in: [
            new mongoose.Types.ObjectId(userId),
            "$likesData.user"
          ]
        }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author"
      }
    },
    { $unwind: "$author" },
    {
      $project: {
        "author.password": 0,
        likesData: 0
      }
    }
  ]);

  return posts;
};

export const getPostsByUserService = async (
  currentUserId: string,
  profileUserId: string,
  page: number,
  limit: number
) => {
  if (!isValidMongoId(profileUserId)) {
    throw new ApiError(
      MESSAGES.ERROR.INVALID_USER_ID,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const skip =
    (page - VALIDATION_RULES.FEED_DEFAULT_PAGE) * limit;

  const posts = await Post.find({ author: profileUserId })
    .populate("author", "-password")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const postIds = posts.map((p) => p._id);

  const userLikes = await Like.find({
    user: currentUserId,
    post: { $in: postIds }
  });

  const likedPostIds = new Set(
    userLikes.map((l) => l.post.toString())
  );

  return posts.map((post) => ({
    ...post.toObject(),
    isLikedByCurrentUser: likedPostIds.has(
      post._id.toString()
    )
  }));
};
