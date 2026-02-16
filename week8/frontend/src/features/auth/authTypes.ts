
import type { AuthUser } from "../../types/auth";

export type AuthState = {
  authUser: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  authError: string | null;
};

export type AuthAction =
  | {
      type: "AUTH_LOADING_START";
    }
  | {
      type: "AUTH_LOADING_END";
    }
  | {
      type: "AUTH_SUCCESS";
      payload: {
        user: AuthUser;
        token: string;
      };
    }
  | {
      type: "AUTH_LOGOUT";
    }
  | {
      type: "AUTH_ERROR";
      payload: {
        message: string;
      };
    }
  | {
      type: "CLEAR_AUTH_ERROR";
    };
