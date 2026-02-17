
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { clearUsersError, fetchUserById, fetchUsers } from "../redux/slices/usersSlice";
import { searchUsers } from "../redux/slices/usersSlice";

export const useUsers = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users.users);
  const selectedUser = useAppSelector((state) => state.users.selectedUser);
  const isLoading = useAppSelector((state) => state.users.isLoading);
  const error = useAppSelector((state) => state.users.error);
  const searchResults = useAppSelector((state) => state.users.searchResults);

  const fetchAllUsers = async () => {
    await dispatch(fetchUsers());
  };

  const fetchSingleUser = async (userId: string) => {
    await dispatch(fetchUserById(userId));
  };

  const clearError = () => {
    dispatch(clearUsersError());
  };

  const search = async (query: string) => {
    await dispatch(searchUsers(query));
  };

  return {
    users,
    selectedUser,
    searchResults,
    isLoading,
    error,
    fetchUsers: fetchAllUsers,
    fetchUserById: fetchSingleUser,
    searchUsers: search,
    clearUsersError: clearError
  };
}
