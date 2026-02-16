
import type { UsersAction, UsersState } from "./usersTypes";

export const USERS_INITIAL_STATE: UsersState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null
};

export const usersReducer = (
  state: UsersState,
  action: UsersAction
): UsersState => {
  switch (action.type) {
    case "USERS_LOADING_START":
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case "USERS_LOADING_END":
      return {
        ...state,
        isLoading: false
      };

    case "SET_USERS":
      return {
        ...state,
        users: action.payload.users,
        isLoading: false,
        error: null
      };

    case "SET_SELECTED_USER":
      return {
        ...state,
        selectedUser: action.payload.user,
        isLoading: false,
        error: null
      };

    case "USERS_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };

    case "CLEAR_USERS_ERROR":
      return {
        ...state,
        error: null
      };

    case "RESET_USERS_STATE":
      return USERS_INITIAL_STATE;

    default:
      return state;
  }
};
