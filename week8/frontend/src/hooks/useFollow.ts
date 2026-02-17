
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  clearFollowError,
  fetchFollowing,
  followUser,
  unfollowUser,
  fetchFollowersByUserId,
  fetchFollowingByUserId
} from "../redux/slices/followSlice";
import {
  incrementFollowerCount,
  decrementFollowerCount
} from "../redux/slices/usersSlice";

export const useFollow = () => {
  const dispatch = useAppDispatch();

  const {
    followingIds,
    followersList,
    followingList,
    isLoading,
    error
  } = useAppSelector((state) => state.follow);

  const refreshFollowing = async () => {
    await dispatch(fetchFollowing());
  };

  const follow = async (userId: string) => {
    const result = await dispatch(followUser(userId));

    if (followUser.fulfilled.match(result)) {
      dispatch(incrementFollowerCount(userId));
    }
  };

  const unfollow = async (userId: string) => {
    const result = await dispatch(unfollowUser(userId));

    if (unfollowUser.fulfilled.match(result)) {
      dispatch(decrementFollowerCount(userId));
    }
  };

  const fetchFollowers = async (userId: string) => {
    await dispatch(fetchFollowersByUserId(userId));
  };

  const fetchFollowingById = async (userId: string) => {
    await dispatch(fetchFollowingByUserId(userId));
  };

  const clearError = () => {
    dispatch(clearFollowError());
  };

  const isFollowing = (userId: string) => {
    return followingIds.includes(userId);
  };

  return {
    followingIds,
    followersList,
    followingList,
    isLoading,
    error,
    refreshFollowing,
    followUser: follow,
    unfollowUser: unfollow,
    fetchFollowersByUserId: fetchFollowers,
    fetchFollowingByUserId: fetchFollowingById,
    clearFollowError: clearError,
    isFollowing
  };
};
