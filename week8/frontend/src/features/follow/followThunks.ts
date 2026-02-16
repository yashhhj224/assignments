
import {
  followUserApi,
  getFollowingApi,
  unfollowUserApi
} from "../../api/followApi";

export const fetchFollowingThunk = async (): Promise<string[]> => {
  const users = await getFollowingApi();
  return users.map((u) => u._id);
};

export const followUserThunk = async (userId: string): Promise<void> => {
  await followUserApi(userId);
};

export const unfollowUserThunk = async (userId: string): Promise<void> => {
  await unfollowUserApi(userId);
};
