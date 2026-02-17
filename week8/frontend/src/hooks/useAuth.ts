
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  clearAuthError,
  loginUser,
  logoutUser,
  registerUser
} from "../redux/slices/authSlice";
import type { LoginRequestBody, RegisterRequestBody } from "../types/auth";
import { restoreAuthSession, changePassword } from "../redux/slices/authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const authUser = useAppSelector((state) => state.auth.authUser);
  const token = useAppSelector((state) => state.auth.token);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isAuthLoading = useAppSelector((state) => state.auth.isAuthLoading);
  const authError = useAppSelector((state) => state.auth.authError);

  const register = async (payload: RegisterRequestBody) => {
    await dispatch(registerUser(payload));
  };

  const login = async (payload: LoginRequestBody) => {
    await dispatch(loginUser(payload));
  };

  const changeUserPassword = async (payload: {
    currentPassword: string;
    newPassword: string;
  }) => {
    return await dispatch(changePassword(payload));
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  const clearError = () => {
    dispatch(clearAuthError());
  };

  const refreshProfile = async () => {
    await dispatch(restoreAuthSession());
  };

  return {
    authUser,
    token,
    isAuthenticated,
    isAuthLoading,
    authError,
    registerUser: register,
    loginUser: login,
    logoutUser: logout,
    clearAuthError: clearError,
    changePassword: changeUserPassword,
    refreshProfile
  };
};
