
import { createContext, useEffect, useMemo, useReducer } from "react";
import { parseApiErrorMessage } from "../../utils/errorParser";
import { useAuth } from "../../hooks/useAuth";
import { FOLLOW_INITIAL_STATE, followReducer } from "./followSlice";
import {
  fetchFollowingThunk,
  followUserThunk,
  unfollowUserThunk
} from "./followThunks";

type FollowContextValue = {
  followingIds: string[];
  isLoading: boolean;
  error: string | null;

  refreshFollowing: () => Promise<void>;
  followUser: (userId: string) => Promise<void>;
  unfollowUser: (userId: string) => Promise<void>;
  clearFollowError: () => void;

  isFollowing: (userId: string) => boolean;
};

export const FollowContext = createContext<FollowContextValue | null>(null);

type FollowProviderProps = {
  children: React.ReactNode;
};

export const FollowProvider = ({ children }: FollowProviderProps) => {
  const { isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(followReducer, FOLLOW_INITIAL_STATE);

  const refreshFollowing = async () => {
    dispatch({ type: "FOLLOW_LOADING_START" });

    try {
      const ids = await fetchFollowingThunk();

      dispatch({
        type: "SET_FOLLOWING_IDS",
        payload: { followingIds: ids }
      });
    } catch (error) {
      dispatch({
        type: "FOLLOW_ERROR",
        payload: { message: parseApiErrorMessage(error) }
      });
    }
  };

  const followUser = async (userId: string) => {
    dispatch({ type: "FOLLOW_LOADING_START" });

    try {
      await followUserThunk(userId);

      dispatch({
        type: "FOLLOW_USER",
        payload: { userId }
      });
    } catch (error) {
      dispatch({
        type: "FOLLOW_ERROR",
        payload: { message: parseApiErrorMessage(error) }
      });
    }
  };

  const unfollowUser = async (userId: string) => {
    dispatch({ type: "FOLLOW_LOADING_START" });

    try {
      await unfollowUserThunk(userId);

      dispatch({
        type: "UNFOLLOW_USER",
        payload: { userId }
      });
    } catch (error) {
      dispatch({
        type: "FOLLOW_ERROR",
        payload: { message: parseApiErrorMessage(error) }
      });
    }
  };

  const clearFollowError = () => {
    dispatch({ type: "CLEAR_FOLLOW_ERROR" });
  };

  const isFollowing = (userId: string): boolean => {
    return state.followingIds.includes(userId);
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshFollowing();
      return;
    }

    dispatch({
      type: "SET_FOLLOWING_IDS",
      payload: { followingIds: [] }
    });
  }, [isAuthenticated]);

  const value = useMemo(
    () => ({
      followingIds: state.followingIds,
      isLoading: state.isLoading,
      error: state.error,
      refreshFollowing,
      followUser,
      unfollowUser,
      clearFollowError,
      isFollowing
    }),
    [state]
  );

  return (
    <FollowContext.Provider value={value}>
      {children}
    </FollowContext.Provider>
  );
};
