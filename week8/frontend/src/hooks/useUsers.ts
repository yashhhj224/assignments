
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { clearUsersError, fetchUserById, fetchUsers } from "../redux/slices/usersSlice";

export const useUsers = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users.users);
  const selectedUser = useAppSelector((state) => state.users.selectedUser);
  const isLoading = useAppSelector((state) => state.users.isLoading);
  const error = useAppSelector((state) => state.users.error);

  const fetchAllUsers = async () => {
    await dispatch(fetchUsers());
  };

  const fetchSingleUser = async (userId: string) => {
    await dispatch(fetchUserById(userId));
  };

  const clearError = () => {
    dispatch(clearUsersError());
  };

  return {
    users,
    selectedUser,
    isLoading,
    error,
    fetchUsers: fetchAllUsers,
    fetchUserById: fetchSingleUser,
    clearUsersError: clearError
  };
};
