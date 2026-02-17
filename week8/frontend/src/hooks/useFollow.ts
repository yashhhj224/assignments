
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  clearFollowError,
  fetchFollowing,
  followUser,
  unfollowUser
} from "../redux/slices/followSlice";

export const useFollow = () => {
  const dispatch = useAppDispatch();

  const followingIds = useAppSelector((state) => state.follow.followingIds);
  const isLoading = useAppSelector((state) => state.follow.isLoading);
  const error = useAppSelector((state) => state.follow.error);

  const refreshFollowing = async () => {
    await dispatch(fetchFollowing());
  };

  const follow = async (userId: string) => {
    await dispatch(followUser(userId));
  };

  const unfollow = async (userId: string) => {
    await dispatch(unfollowUser(userId));
  };

  const clearError = () => {
    dispatch(clearFollowError());
  };

  const isFollowing = (userId: string) => {
    return followingIds.includes(userId);
  };

  return {
    followingIds,
    isLoading,
    error,
    refreshFollowing,
    followUser: follow,
    unfollowUser: unfollow,
    clearFollowError: clearError,
    isFollowing
  };
};
