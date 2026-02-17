
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  clearAuthError,
  loginUser,
  logoutUser,
  registerUser
} from "../redux/slices/authSlice";
import type { LoginRequestBody, RegisterRequestBody } from "../types/auth";

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

  const logout = () => {
    dispatch(logoutUser());
  };

  const clearError = () => {
    dispatch(clearAuthError());
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
    clearAuthError: clearError
  };
};
