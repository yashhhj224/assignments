
import { createContext, useEffect, useMemo, useReducer } from "react";
import type { User } from "../../types/user";
import { parseApiErrorMessage } from "../../utils/errorParser";
import { useAuth } from "../../hooks/useAuth";
import { fetchAllUsersThunk, fetchUserByIdThunk } from "./usersThunks";
import { USERS_INITIAL_STATE, usersReducer } from "./usersSlice";

type UsersContextValue = {
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;

  fetchUsers: () => Promise<void>;
  fetchUserById: (userId: string) => Promise<void>;
  clearUsersError: () => void;
};

export const UsersContext = createContext<UsersContextValue | null>(null);

type UsersProviderProps = {
  children: React.ReactNode;
};

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const { isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(usersReducer, USERS_INITIAL_STATE);

  const fetchUsers = async () => {
    dispatch({ type: "USERS_LOADING_START" });

    try {
      const users = await fetchAllUsersThunk();

      dispatch({
        type: "SET_USERS",
        payload: { users }
      });
    } catch (error) {
      dispatch({
        type: "USERS_ERROR",
        payload: { message: parseApiErrorMessage(error) }
      });
    }
  };

  const fetchUserById = async (userId: string) => {
    dispatch({ type: "USERS_LOADING_START" });

    try {
      const user = await fetchUserByIdThunk(userId);

      dispatch({
        type: "SET_SELECTED_USER",
        payload: { user }
      });
    } catch (error) {
      dispatch({
        type: "USERS_ERROR",
        payload: { message: parseApiErrorMessage(error) }
      });
    }
  };

  const clearUsersError = () => {
    dispatch({ type: "CLEAR_USERS_ERROR" });
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
      return;
    }

    dispatch({ type: "RESET_USERS_STATE" });
  }, [isAuthenticated]);

  const value = useMemo(
    () => ({
      users: state.users,
      selectedUser: state.selectedUser,
      isLoading: state.isLoading,
      error: state.error,
      fetchUsers,
      fetchUserById,
      clearUsersError
    }),
    [state]
  );

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
};
