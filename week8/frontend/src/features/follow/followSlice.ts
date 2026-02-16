
import type { FollowAction, FollowState } from "./followTypes";

export const FOLLOW_INITIAL_STATE: FollowState = {
  followingIds: [],
  isLoading: false,
  error: null
};

export const followReducer = (
  state: FollowState,
  action: FollowAction
): FollowState => {
  switch (action.type) {
    case "FOLLOW_LOADING_START":
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case "FOLLOW_LOADING_END":
      return {
        ...state,
        isLoading: false
      };

    case "SET_FOLLOWING_IDS":
      return {
        ...state,
        followingIds: action.payload.followingIds,
        isLoading: false,
        error: null
      };

    case "FOLLOW_USER":
      return {
        ...state,
        followingIds: state.followingIds.includes(action.payload.userId)
          ? state.followingIds
          : [...state.followingIds, action.payload.userId],
        isLoading: false,
        error: null
      };

    case "UNFOLLOW_USER":
      return {
        ...state,
        followingIds: state.followingIds.filter(
          (id) => id !== action.payload.userId
        ),
        isLoading: false,
        error: null
      };

    case "FOLLOW_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };

    case "CLEAR_FOLLOW_ERROR":
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};
