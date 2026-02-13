
import { Post } from "../models/Post";
import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";
import { HTTP_STATUS } from "../constants/httpStatus";
import { VALIDATION_RULES } from "../constants/validation";
import { isNonEmptyString, isValidMongoId, normalizeTags, normalizeText } from "../utils/validators";
import { MESSAGES } from "../constants/messages";

export const createPostService = async (userId: string, payload: any) => {
  if (!payload) {
    throw new ApiError(MESSAGES.ERROR.REQUEST_BODY_REQUIRED, HTTP_STATUS.BAD_REQUEST);
  }

  if (!isNonEmptyString(payload.title)) {
    throw new ApiError(MESSAGES.ERROR.TITLE_REQUIRED, HTTP_STATUS.BAD_REQUEST);
  }

  if (!isNonEmptyString(payload.content)) {
    throw new ApiError(MESSAGES.ERROR.CONTENT_REQUIRED, HTTP_STATUS.BAD_REQUEST);
  }

  const title = normalizeText(payload.title);
  const content = normalizeText(payload.content);
  const tags = normalizeTags(payload.tags);

  const images = Array.isArray(payload.images)
    ? payload.images.map((img: string) => normalizeText(img))
    : [];

  if (title.length < VALIDATION_RULES.POST_TITLE_MIN_LENGTH) {
    throw new ApiError(MESSAGES.ERROR.TITLE_TOO_SHORT, HTTP_STATUS.BAD_REQUEST);
  }

  if (content.length < VALIDATION_RULES.POST_CONTENT_MIN_LENGTH) {
    throw new ApiError(MESSAGES.ERROR.CONTENT_TOO_SHORT, HTTP_STATUS.BAD_REQUEST);
  }

  const post = await Post.create({
    author: userId,
    title,
    content,
    images,
    tags
  });

  return post;
};

export const updatePostService = async (userId: string, postId: string, payload: any) => {
  if (!isValidMongoId(postId)) {
    throw new ApiError(MESSAGES.ERROR.INVALID_POST_ID, HTTP_STATUS.BAD_REQUEST);
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(MESSAGES.ERROR.POST_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  if (payload.title !== undefined) {
    if (!isNonEmptyString(payload.title)) {
      throw new ApiError(MESSAGES.ERROR.TITLE_CANNOT_BE_EMPTY, HTTP_STATUS.BAD_REQUEST);
    }

    const title = normalizeText(payload.title);

    if (title.length < VALIDATION_RULES.POST_TITLE_MIN_LENGTH) {
      throw new ApiError(MESSAGES.ERROR.TITLE_TOO_SHORT, HTTP_STATUS.BAD_REQUEST);
    }

    post.title = title;
  }

  if (payload.content !== undefined) {
    if (!isNonEmptyString(payload.content)) {
      throw new ApiError(MESSAGES.ERROR.CONTENT_CANNOT_BE_EMPTY, HTTP_STATUS.BAD_REQUEST);
    }

    const content = normalizeText(payload.content);

    if (content.length < VALIDATION_RULES.POST_CONTENT_MIN_LENGTH) {
      throw new ApiError(MESSAGES.ERROR.CONTENT_TOO_SHORT, HTTP_STATUS.BAD_REQUEST);
    }

    post.content = content;
  }

  if (payload.images !== undefined) {
    if (!Array.isArray(payload.images)) {
      throw new ApiError(MESSAGES.ERROR.IMAGES_MUST_BE_ARRAY, HTTP_STATUS.BAD_REQUEST);
    }

    post.images = payload.images.map((img: string) => normalizeText(img));
  }


  if (payload.tags !== undefined) {
    post.tags = normalizeTags(payload.tags);
  }

  await post.save();

  return post;
};

export const deletePostService = async (userId: string, postId: string) => {
  if (!isValidMongoId(postId)) {
    throw new ApiError(MESSAGES.ERROR.INVALID_POST_ID, HTTP_STATUS.BAD_REQUEST);
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(MESSAGES.ERROR.POST_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  await Post.findByIdAndDelete(postId);

  return true;
};

export const getPostByIdService = async (postId: string) => {
  if (!isValidMongoId(postId)) {
    throw new ApiError(MESSAGES.ERROR.INVALID_POST_ID, HTTP_STATUS.BAD_REQUEST);
  }

  const post = await Post.findById(postId).populate("author", "-password");

  if (!post) {
    throw new ApiError(MESSAGES.ERROR.POST_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  return post;
};

export const getFeedService = async (userId: string, page: number, limit: number) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(MESSAGES.ERROR.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  const followingIds = user.following.map((id) => id.toString());
  const authorIds = [...followingIds, userId];

  const skip = (page - VALIDATION_RULES.FEED_DEFAULT_PAGE) * limit;

  const posts = await Post.find({ author: { $in: authorIds } })
    .populate("author", "-password")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return posts;
};

export const getPostsByUserService = async (
  userId: string,
  page: number,
  limit: number
) => {
  if (!isValidMongoId(userId)) {
    throw new ApiError(MESSAGES.ERROR.INVALID_USER_ID, HTTP_STATUS.BAD_REQUEST);
  }

  const skip = (page - VALIDATION_RULES.FEED_DEFAULT_PAGE) * limit;

  const posts = await Post.find({ author: userId })
    .populate("author", "-password")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return posts;
};

