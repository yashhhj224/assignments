
import type { UsersState } from "./usersTypes";

export const selectUsers = (state: UsersState) => state.users;

export const selectSelectedUser = (state: UsersState) => state.selectedUser;

export const selectUsersLoading = (state: UsersState) => state.isLoading;

export const selectUsersError = (state: UsersState) => state.error;
