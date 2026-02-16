
import type { User } from "../../types/user";

export type UsersState = {
  users: User[];
  selectedUser: User | null;

  isLoading: boolean;
  error: string | null;
};

export type UsersAction =
  | {
      type: "USERS_LOADING_START";
    }
  | {
      type: "USERS_LOADING_END";
    }
  | {
      type: "SET_USERS";
      payload: {
        users: User[];
      };
    }
  | {
      type: "SET_SELECTED_USER";
      payload: {
        user: User | null;
      };
    }
  | {
      type: "USERS_ERROR";
      payload: {
        message: string;
      };
    }
  | {
      type: "CLEAR_USERS_ERROR";
    }
  | {
      type: "RESET_USERS_STATE";
    };
