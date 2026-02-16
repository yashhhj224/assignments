
import { createContext, useEffect, useMemo, useReducer } from "react";
import type { AuthUser, LoginRequestBody, RegisterRequestBody } from "../../types/auth";
import { parseApiErrorMessage } from "../../utils/errorParser";
import { AUTH_INITIAL_STATE, authReducer } from "./authSlice";
import {
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  restoreAuthThunk
} from "./authThunks";

type AuthContextValue = {
  authUser: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  authError: string | null;

  registerUser: (payload: RegisterRequestBody) => Promise<void>;
  loginUser: (payload: LoginRequestBody) => Promise<void>;
  logoutUser: () => void;
  clearAuthError: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const registerUser = async (payload: RegisterRequestBody) => {
    dispatch({ type: "AUTH_LOADING_START" });

    try {
      const result = await registerUserThunk(payload);

      dispatch({
        type: "AUTH_SUCCESS",
        payload: {
          user: result.user,
          token: result.token
        }
      });
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        payload: { message: parseApiErrorMessage(error) }
      });
    }
  };

  const loginUser = async (payload: LoginRequestBody) => {
    dispatch({ type: "AUTH_LOADING_START" });

    try {
      const result = await loginUserThunk(payload);

      dispatch({
        type: "AUTH_SUCCESS",
        payload: {
          user: result.user,
          token: result.token
        }
      });
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        payload: { message: parseApiErrorMessage(error) }
      });
    }
  };

  const logoutUser = () => {
    logoutUserThunk();
    dispatch({ type: "AUTH_LOGOUT" });
  };

  const clearAuthError = () => {
    dispatch({ type: "CLEAR_AUTH_ERROR" });
  };

  useEffect(() => {
    const restoreSession = async () => {
      dispatch({ type: "AUTH_LOADING_START" });

      const restoredAuth = await restoreAuthThunk();

      if (!restoredAuth) {
        dispatch({ type: "AUTH_LOADING_END" });
        return;
      }

      dispatch({
        type: "AUTH_SUCCESS",
        payload: {
          user: restoredAuth.user,
          token: restoredAuth.token
        }
      });
    };

    restoreSession();
  }, []);

  const value: AuthContextValue = useMemo(
    () => ({
      authUser: state.authUser,
      token: state.token,
      isAuthenticated: state.isAuthenticated,
      isAuthLoading: state.isAuthLoading,
      authError: state.authError,
      registerUser,
      loginUser,
      logoutUser,
      clearAuthError
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
