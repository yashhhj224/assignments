
import { API_ROUTES } from "../constants/apiRoutes";
import type { UpdateProfileRequestBody, User } from "../types/user";
import { normalizeText } from "../utils/validators";
import { sendRequest } from "./apiClient";

export const getProfileApi = async (): Promise<User> => {
  return sendRequest<User>({
    endpoint: API_ROUTES.USER.PROFILE,
    method: "GET"
  });
};

export const updateProfileApi = async (
  payload: UpdateProfileRequestBody
): Promise<User> => {
  const safePayload: UpdateProfileRequestBody = {};

  if (payload.username !== undefined) {
    safePayload.username = normalizeText(payload.username);
  }

  if (payload.profilePic !== undefined) {
    safePayload.profilePic = normalizeText(payload.profilePic);
  }

  return sendRequest<User, UpdateProfileRequestBody>({
    endpoint: API_ROUTES.USER.PROFILE,
    method: "PUT",
    body: safePayload
  });
};

export const updateProfilePictureApi = async (
  profilePic: string
): Promise<User> => {
  return sendRequest<User, { profilePic: string }>({
    endpoint: "/profile/picture",
    method: "PUT",
    body: { profilePic: normalizeText(profilePic) }
  });
};

export const getAllUsersApi = async (): Promise<User[]> => {
  return sendRequest<User[]>({
    endpoint: API_ROUTES.USER.USERS,
    method: "GET"
  });
};

export const getUserByIdApi = async (userId: string): Promise<User> => {
  return sendRequest<User>({
    endpoint: API_ROUTES.USER.USER_BY_ID(userId),
    method: "GET"
  });
};
