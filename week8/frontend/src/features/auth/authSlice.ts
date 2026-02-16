
import type { AuthAction, AuthState } from "./authTypes";

export const AUTH_INITIAL_STATE: AuthState = {
  authUser: null,
  token: null,
  isAuthenticated: false,
  isAuthLoading: true,
  authError: null
};

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "AUTH_LOADING_START":
      return {
        ...state,
        isAuthLoading: true,
        authError: null
      };

    case "AUTH_LOADING_END":
      return {
        ...state,
        isAuthLoading: false
      };

    case "AUTH_SUCCESS":
      return {
        ...state,
        authUser: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        authError: null,
        isAuthLoading: false
      };

    case "AUTH_LOGOUT":
      return {
        ...state,
        authUser: null,
        token: null,
        isAuthenticated: false,
        authError: null,
        isAuthLoading: false
      };

    case "AUTH_ERROR":
      return {
        ...state,
        authError: action.payload.message,
        isAuthLoading: false
      };

    case "CLEAR_AUTH_ERROR":
      return {
        ...state,
        authError: null
      };

    default:
      return state;
  }
};
