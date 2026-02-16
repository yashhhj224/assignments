
import { getAllUsersApi, getUserByIdApi } from "../../api/userApi";
import type { User } from "../../types/user";

export const fetchAllUsersThunk = async (): Promise<User[]> => {
  return getAllUsersApi();
};

export const fetchUserByIdThunk = async (userId: string): Promise<User> => {
  return getUserByIdApi(userId);
};
