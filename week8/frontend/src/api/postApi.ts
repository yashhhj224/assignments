
import { API_ROUTES } from "../constants/apiRoutes";
import type {
  CreatePostRequestBody,
  Post,
  UpdatePostRequestBody
} from "../types/post";
import { normalizeTags, normalizeText } from "../utils/validators";
import { sendRequest } from "./apiClient";

export const getFeedApi = async (
  page: number,
  limit: number
): Promise<Post[]> => {
  return sendRequest<Post[]>({
    endpoint: `${API_ROUTES.POSTS.FEED}?page=${page}&limit=${limit}`,
    method: "GET"
  });
};

export const createPostApi = async (
  payload: CreatePostRequestBody
): Promise<Post> => {
  const safePayload: CreatePostRequestBody = {
    title: normalizeText(payload.title),
    content: normalizeText(payload.content),
    images: Array.isArray(payload.images)
      ? payload.images.map((img) => normalizeText(img))
      : [],
    tags: normalizeTags(payload.tags)
  };

  return sendRequest<Post, CreatePostRequestBody>({
    endpoint: API_ROUTES.POSTS.CREATE,
    method: "POST",
    body: safePayload
  });
};

export const updatePostApi = async (
  postId: string,
  payload: UpdatePostRequestBody
): Promise<Post> => {
  const safePayload: UpdatePostRequestBody = {};

  if (payload.title !== undefined) {
    safePayload.title = normalizeText(payload.title);
  }

  if (payload.content !== undefined) {
    safePayload.content = normalizeText(payload.content);
  }

  if (payload.images !== undefined) {
    safePayload.images = Array.isArray(payload.images)
      ? payload.images.map((img) => normalizeText(img))
      : [];
  }

  if (payload.tags !== undefined) {
    safePayload.tags = normalizeTags(payload.tags);
  }

  return sendRequest<Post, UpdatePostRequestBody>({
    endpoint: API_ROUTES.POSTS.UPDATE(postId),
    method: "PUT",
    body: safePayload
  });
};

export const deletePostApi = async (postId: string): Promise<void> => {
  await sendRequest<null>({
    endpoint: API_ROUTES.POSTS.DELETE(postId),
    method: "DELETE"
  });
};

export const getPostByIdApi = async (postId: string): Promise<Post> => {
  return sendRequest<Post>({
    endpoint: API_ROUTES.POSTS.POST_BY_ID(postId),
    method: "GET"
  });
};

export const getPostsByUserApi = async (
  userId: string,
  page: number,
  limit: number
): Promise<Post[]> => {
  return sendRequest<Post[]>({
    endpoint: `${API_ROUTES.POSTS.POSTS_BY_USER(userId)}?page=${page}&limit=${limit}`,
    method: "GET"
  });
};
