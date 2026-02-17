
import { API_ROUTES } from "../constants/apiRoutes";
import type { UpdateProfileRequestBody, User } from "../types/user";
import { normalizeEmail, normalizeText } from "../utils/validators";
import { sendRequest } from "./apiClient";

export const getProfileApi = async (): Promise<User> => {
  return sendRequest<User>({
    endpoint: API_ROUTES.USER.PROFILE,
    method: "GET"
  });
};

export const updateProfileApi = async (
  payload: UpdateProfileRequestBody & { email?: string }
): Promise<User> => {
  const safePayload: Record<string, string> = {};

  if (payload.username !== undefined) {
    safePayload.username = normalizeText(payload.username);
  }

  if (payload.email !== undefined) {
    safePayload.email = normalizeEmail(payload.email);
  }

  if (payload.profilePic !== undefined) {
    safePayload.profilePic = normalizeText(payload.profilePic);
  }

  return sendRequest<User>({
    endpoint: API_ROUTES.USER.PROFILE,
    method: "PUT",
    body: safePayload
  });
};

export const updateProfilePictureApi = async (
  profilePic: string
): Promise<User> => {
  return sendRequest<User, { profilePic: string }>({
    endpoint: "/api/profile/picture",
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

export const searchUsersApi = async (query: string): Promise<User[]> => {
  return sendRequest<User[]>({
    endpoint: API_ROUTES.USER.SEARCH(query),
    method: "GET"
  });
};

export const changePasswordApi = async (payload: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ success: boolean }> => {
  return sendRequest<{ success: boolean }>({
    endpoint: "/api/change-password",
    method: "PUT",
    body: {
      currentPassword: normalizeText(payload.currentPassword),
      newPassword: normalizeText(payload.newPassword)
    }
  });
};
