
import { APP_CONSTANTS } from "../../constants/appConstants";
import {
  createPostApi,
  deletePostApi,
  getFeedApi,
  getPostByIdApi,
  getPostsByUserApi,
  updatePostApi
} from "../../api/postApi";
import type {
  CreatePostRequestBody,
  Post,
  UpdatePostRequestBody
} from "../../types/post";

export const fetchFeedPostsThunk = async (
  page: number,
  limit: number = APP_CONSTANTS.DEFAULT_FEED_LIMIT
): Promise<Post[]> => {
  return getFeedApi(page, limit);
};

export const fetchUserPostsThunk = async (
  userId: string,
  page: number,
  limit: number = APP_CONSTANTS.DEFAULT_FEED_LIMIT
): Promise<Post[]> => {
  return getPostsByUserApi(userId, page, limit);
};

export const fetchPostByIdThunk = async (postId: string): Promise<Post> => {
  return getPostByIdApi(postId);
};

export const createPostThunk = async (
  payload: CreatePostRequestBody
): Promise<Post> => {
  return createPostApi(payload);
};

export const updatePostThunk = async (
  postId: string,
  payload: UpdatePostRequestBody
): Promise<Post> => {
  return updatePostApi(postId, payload);
};

export const deletePostThunk = async (postId: string): Promise<void> => {
  await deletePostApi(postId);
};
