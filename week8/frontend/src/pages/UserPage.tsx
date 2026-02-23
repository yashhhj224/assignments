
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchAllUsers } from "../redux/slices/usersSlice";
import FollowersFollowingList from "../components/users/FollowersFollowingList";

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <FollowersFollowingList
      type="all"
      users={users}
    />
  );
};

export default UsersPage;