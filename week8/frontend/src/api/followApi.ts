
import { API_ROUTES } from "../constants/apiRoutes";
import type { User } from "../types/user";
import { sendRequest } from "./apiClient";

export const followUserApi = async (userId: string): Promise<void> => {
  await sendRequest<null>({
    endpoint: API_ROUTES.FOLLOW.FOLLOW_USER(userId),
    method: "POST"
  });
};

export const unfollowUserApi = async (userId: string): Promise<void> => {
  await sendRequest<null>({
    endpoint: API_ROUTES.FOLLOW.UNFOLLOW_USER(userId),
    method: "DELETE"
  });
};

export const getFollowingApi = async (): Promise<User[]> => {
  return sendRequest<User[]>({
    endpoint: API_ROUTES.FOLLOW.FOLLOWING,
    method: "GET"
  });
};

export const getFollowersApi = async (userId: string): Promise<User[]> => {
  return sendRequest<User[]>({
    endpoint: API_ROUTES.FOLLOW.FOLLOWERS(userId),
    method: "GET"
  });
};

export const getFollowingByUserIdApi = async (
  userId: string
): Promise<User[]> => {
  return sendRequest<User[]>({
    endpoint: `/api/following/${userId}`,
    method: "GET"
  });
};
