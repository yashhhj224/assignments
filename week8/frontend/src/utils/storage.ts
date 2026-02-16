
import { APP_CONSTANTS } from "../constants/appConstants";
import type { AuthUser } from "../types/auth";

export const saveAuthToken = (token: string): void => {
  localStorage.setItem(APP_CONSTANTS.TOKEN_KEY, token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(APP_CONSTANTS.TOKEN_KEY);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem(APP_CONSTANTS.TOKEN_KEY);
};

export const saveAuthUser = (user: AuthUser): void => {
  localStorage.setItem(APP_CONSTANTS.USER_KEY, JSON.stringify(user));
};

export const getAuthUser = (): AuthUser | null => {
  const rawUser = localStorage.getItem(APP_CONSTANTS.USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as AuthUser;
  } catch {
    return null;
  }
};

export const removeAuthUser = (): void => {
  localStorage.removeItem(APP_CONSTANTS.USER_KEY);
};

export const clearAuthStorage = (): void => {
  removeAuthToken();
  removeAuthUser();
};
