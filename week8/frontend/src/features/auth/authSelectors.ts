
import type { AuthState } from "./authTypes";

export const selectAuthUser = (state: AuthState) => state.authUser;

export const selectIsAuthenticated = (state: AuthState) =>
  state.isAuthenticated;

export const selectAuthToken = (state: AuthState) => state.token;

export const selectAuthLoading = (state: AuthState) => state.isAuthLoading;

export const selectAuthError = (state: AuthState) => state.authError;
