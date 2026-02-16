
import type { FollowState } from "./followTypes";

export const selectFollowingIds = (state: FollowState) => state.followingIds;

export const selectFollowLoading = (state: FollowState) => state.isLoading;

export const selectFollowError = (state: FollowState) => state.error;

export const selectIsFollowing = (state: FollowState, userId: string) =>
  state.followingIds.includes(userId);
