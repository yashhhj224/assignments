
import { createContext, useEffect, useMemo, useReducer } from "react";
import type { Post } from "../../types/post";
import { parseApiErrorMessage } from "../../utils/errorParser";
import { useAuth } from "../../hooks/useAuth";
import { APP_CONSTANTS } from "../../constants/appConstants";
import { POSTS_INITIAL_STATE, postsReducer } from "./postsSlice";
import { createPostThunk, deletePostThunk, fetchFeedPostsThunk, fetchPostByIdThunk,fetchUserPostsThunk, updatePostThunk } from "./postsThunks";
import type { CreatePostRequestBody, UpdatePostRequestBody } from "../../types/post";

type PostsContextValue = {
  feedPosts: Post[];
  userPosts: Post[];
  selectedPost: Post | null;

  hasMoreFeed: boolean;
  hasMoreUserPosts: boolean;

  isLoading: boolean;
  error: string | null;

  refreshFeed: () => Promise<void>;
  fetchNextFeedPage: () => Promise<void>;

  refreshUserPosts: (userId: string) => Promise<void>;
  fetchNextUserPostsPage: (userId: string) => Promise<void>;

  fetchPostById: (postId: string) => Promise<void>;

  createPost: (payload: CreatePostRequestBody) => Promise<Post | null>;
  updatePost: (
    postId: string,
    payload: UpdatePostRequestBody
  ) => Promise<Post | null>;
  deletePost: (postId: string) => Promise<boolean>;

  clearPostsError: () => void;
};

export const PostsContext = createContext<PostsContextValue | null>(null);

type PostsProviderProps = {
  children: React.ReactNode;
};

export const PostsProvider = ({ children }: PostsProviderProps) => {
  const { isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(postsReducer, POSTS_INITIAL_STATE);

  const refreshFeed = async () => {
    dispatch({ type: "POSTS_LOADING_START" });

    try {
      const posts = await fetchFeedPostsThunk(APP_CONSTANTS.DEFAULT_FEED_PAGE);

      dispatch({
        type: "SET_FEED_POSTS",
        payload: {
          posts,
          page: APP_CONSTANTS.DEFAULT_FEED_PAGE + 1,
          hasMore: posts.length === APP_CONSTANTS.DEFAULT_FEED_LIMIT
        }
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: { message: parseApiErrorMessage(error) }
      });
    }
  };

  const fetchNextFeedPage = async () => {
    if (!state.hasMoreFeed || state.isLoading) {
      return;
    }

    dispatch({ type: "POSTS_LOADING_START" });

    try {
      const posts = await fetchFeedPostsThunk(state.feedPage);

      dispatch({
        type: "APPEND_FEED_POSTS",
        payload: {
          posts,
          page: state.feedPage + 1,
          hasMore: posts.length === APP_CONSTANTS.DEFAULT_FEED_LIMIT
        }
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: { message: parseApiErrorMessage(error) }
      });
    }
  };

  const refreshUserPosts = async (userId: string) => {
    dispatch({ type: "POSTS_LOADING_START" });

    try {
      const posts = await fetchUserPostsThunk(
        userId,
        APP_CONSTANTS.DEFAULT_FEED_PAGE
      );

      dispatch({
        type: "SET_USER_POSTS",
        payload: {
          posts,
          page: APP_CONSTANTS.DEFAULT_FEED_PAGE + 1,
          hasMore: posts.length === APP_CONSTANTS.DEFAULT_FEED_LIMIT
        }
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: { message: parseApiErrorMessage(error) }
      });
    }
  };

  const fetchNextUserPostsPage = async (userId: string) => {
    if (!state.hasMoreUserPosts || state.isLoading) {
      return;
    }

    dispatch({ type: "POSTS_LOADING_START" });

    try {
      const posts = await fetchUserPostsThunk(userId, state.userPostsPage);

      dispatch({
        type: "APPEND_USER_POSTS",
        payload: {
          posts,
          page: state.userPostsPage + 1,
          hasMore: posts.length === APP_CONSTANTS.DEFAULT_FEED_LIMIT
        }
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: { message: parseApiErrorMessage(error) }
      });
    }
  };

  const fetchPostById = async (postId: string) => {
    dispatch({ type: "POSTS_LOADING_START" });

    try {
      const post = await fetchPostByIdThunk(postId);

      dispatch({
        type: "SET_SELECTED_POST",
        payload: { post }
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: { message: parseApiErrorMessage(error) }
      });
    }
  };

  const createPost = async (payload: CreatePostRequestBody) => {
    dispatch({ type: "POSTS_LOADING_START" });

    try {
      const post = await createPostThunk(payload);

      dispatch({ type: "POSTS_LOADING_END" });
      await refreshFeed();

      return post;
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: { message: parseApiErrorMessage(error) }
      });

      return null;
    }
  };

  const updatePost = async (postId: string, payload: UpdatePostRequestBody) => {
    dispatch({ type: "POSTS_LOADING_START" });

    try {
      const post = await updatePostThunk(postId, payload);

      dispatch({ type: "POSTS_LOADING_END" });
      await refreshFeed();

      return post;
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: { message: parseApiErrorMessage(error) }
      });

      return null;
    }
  };

  const deletePost = async (postId: string) => {
    dispatch({ type: "POSTS_LOADING_START" });

    try {
      await deletePostThunk(postId);

      dispatch({ type: "POSTS_LOADING_END" });
      await refreshFeed();

      return true;
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: { message: parseApiErrorMessage(error) }
      });

      return false;
    }
  };

  const clearPostsError = () => {
    dispatch({ type: "CLEAR_POSTS_ERROR" });
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshFeed();
      return;
    }

    dispatch({ type: "RESET_POSTS_STATE" });
  }, [isAuthenticated]);

  const value = useMemo(
    () => ({
      feedPosts: state.feedPosts,
      userPosts: state.userPosts,
      selectedPost: state.selectedPost,
      hasMoreFeed: state.hasMoreFeed,
      hasMoreUserPosts: state.hasMoreUserPosts,
      isLoading: state.isLoading,
      error: state.error,
      refreshFeed,
      fetchNextFeedPage,
      refreshUserPosts,
      fetchNextUserPostsPage,
      fetchPostById,
      createPost,
      updatePost,
      deletePost,
      clearPostsError
    }),
    [state]
  );

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};
