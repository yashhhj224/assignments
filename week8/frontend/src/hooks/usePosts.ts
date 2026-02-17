
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  clearPostsError,
  createPost,
  deletePost,
  fetchFeedPosts,
  fetchPostById,
  fetchUserPosts,
  updatePost
} from "../redux/slices/postsSlice";
import { APP_CONSTANTS } from "../constants/appConstants";
import type { CreatePostRequestBody, UpdatePostRequestBody } from "../types/post";

export const usePosts = () => {
  const dispatch = useAppDispatch();

  const feedPosts = useAppSelector((state) => state.posts.feedPosts);
  const userPosts = useAppSelector((state) => state.posts.userPosts);
  const selectedPost = useAppSelector((state) => state.posts.selectedPost);

  const feedPage = useAppSelector((state) => state.posts.feedPage);
  const hasMoreFeed = useAppSelector((state) => state.posts.hasMoreFeed);

  const userPostsPage = useAppSelector((state) => state.posts.userPostsPage);
  const hasMoreUserPosts = useAppSelector((state) => state.posts.hasMoreUserPosts);

  const isLoading = useAppSelector((state) => state.posts.isLoading);
  const error = useAppSelector((state) => state.posts.error);

  const refreshFeed = async () => {
    await dispatch(fetchFeedPosts(APP_CONSTANTS.DEFAULT_FEED_PAGE));
  };

  const fetchNextFeedPage = async () => {
    if (!hasMoreFeed || isLoading) return;
    await dispatch(fetchFeedPosts(feedPage));
  };

  const refreshUserPosts = async (userId: string) => {
    await dispatch(fetchUserPosts({ userId, page: APP_CONSTANTS.DEFAULT_FEED_PAGE }));
  };

  const fetchNextUserPostsPage = async (userId: string) => {
    if (!hasMoreUserPosts || isLoading) return;
    await dispatch(fetchUserPosts({ userId, page: userPostsPage }));
  };

  const fetchSinglePost = async (postId: string) => {
    await dispatch(fetchPostById(postId));
  };

  const createNewPost = async (payload: CreatePostRequestBody) => {
    const result = await dispatch(createPost(payload));
    if (createPost.fulfilled.match(result)) {
      await refreshFeed();
      return result.payload;
    }
    return null;
  };

  const updateExistingPost = async (postId: string, payload: UpdatePostRequestBody) => {
    const result = await dispatch(updatePost({ postId, payload }));
    if (updatePost.fulfilled.match(result)) {
      await refreshFeed();
      return result.payload;
    }
    return null;
  };

  const deleteExistingPost = async (postId: string) => {
    const result = await dispatch(deletePost(postId));
    if (deletePost.fulfilled.match(result)) {
      await refreshFeed();
      return true;
    }
    return false;
  };

  const clearError = () => {
    dispatch(clearPostsError());
  };

  return {
    feedPosts,
    userPosts,
    selectedPost,

    hasMoreFeed,
    hasMoreUserPosts,

    isLoading,
    error,

    refreshFeed,
    fetchNextFeedPage,

    refreshUserPosts,
    fetchNextUserPostsPage,

    fetchPostById: fetchSinglePost,

    createPost: createNewPost,
    updatePost: updateExistingPost,
    deletePost: deleteExistingPost,

    clearPostsError: clearError
  };
};
