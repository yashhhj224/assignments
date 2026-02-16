
import type { PostsState } from "./postsTypes";

export const selectFeedPosts = (state: PostsState) => state.feedPosts;

export const selectUserPosts = (state: PostsState) => state.userPosts;

export const selectSelectedPost = (state: PostsState) => state.selectedPost;

export const selectFeedPage = (state: PostsState) => state.feedPage;

export const selectHasMoreFeed = (state: PostsState) => state.hasMoreFeed;

export const selectUserPostsPage = (state: PostsState) => state.userPostsPage;

export const selectHasMoreUserPosts = (state: PostsState) =>
  state.hasMoreUserPosts;

export const selectPostsLoading = (state: PostsState) => state.isLoading;

export const selectPostsError = (state: PostsState) => state.error;
