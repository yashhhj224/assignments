
import type {
  AuthResponseData,
  LoginRequestBody,
  RegisterRequestBody
} from "../../types/auth";
import { loginUserApi, registerUserApi } from "../../api/authApi";
import { getProfileApi } from "../../api/userApi";
import {
  clearAuthStorage,
  getAuthToken,
  getAuthUser,
  saveAuthToken,
  saveAuthUser
} from "../../utils/storage";

export const registerUserThunk = async (
  payload: RegisterRequestBody
): Promise<AuthResponseData> => {
  const response = await registerUserApi(payload);

  saveAuthToken(response.token);
  saveAuthUser(response.user);

  return response;
};

export const loginUserThunk = async (
  payload: LoginRequestBody
): Promise<AuthResponseData> => {
  const response = await loginUserApi(payload);

  saveAuthToken(response.token);
  saveAuthUser(response.user);

  return response;
};

export const restoreAuthThunk = async (): Promise<AuthResponseData | null> => {
  const token = getAuthToken();
  const user = getAuthUser();

  if (!token || !user) {
    clearAuthStorage();
    return null;
  }

  try {
    const profile = await getProfileApi();

    const updatedAuth: AuthResponseData = {
      token,
      user: {
        id: profile._id,
        username: profile.username,
        email: profile.email,
        profilePic: profile.profilePic,
        following: profile.following,
        followers: profile.followers
      }
    };

    saveAuthUser(updatedAuth.user);

    return updatedAuth;
  } catch {
    clearAuthStorage();
    return null;
  }
};

export const logoutUserThunk = async (): Promise<void> => {
  clearAuthStorage();
};
