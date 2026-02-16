
import { APP_CONSTANTS } from "../../constants/appConstants";
import type { PostsAction, PostsState } from "./postsTypes";

export const POSTS_INITIAL_STATE: PostsState = {
  feedPosts: [],
  userPosts: [],
  selectedPost: null,

  feedPage: APP_CONSTANTS.DEFAULT_FEED_PAGE,
  hasMoreFeed: true,

  userPostsPage: APP_CONSTANTS.DEFAULT_FEED_PAGE,
  hasMoreUserPosts: true,

  isLoading: false,
  error: null
};

export const postsReducer = (
  state: PostsState,
  action: PostsAction
): PostsState => {
  switch (action.type) {
    case "POSTS_LOADING_START":
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case "POSTS_LOADING_END":
      return {
        ...state,
        isLoading: false
      };

    case "SET_FEED_POSTS":
      return {
        ...state,
        feedPosts: action.payload.posts,
        feedPage: action.payload.page,
        hasMoreFeed: action.payload.hasMore,
        isLoading: false,
        error: null
      };

    case "APPEND_FEED_POSTS":
      return {
        ...state,
        feedPosts: [...state.feedPosts, ...action.payload.posts],
        feedPage: action.payload.page,
        hasMoreFeed: action.payload.hasMore,
        isLoading: false,
        error: null
      };

    case "SET_USER_POSTS":
      return {
        ...state,
        userPosts: action.payload.posts,
        userPostsPage: action.payload.page,
        hasMoreUserPosts: action.payload.hasMore,
        isLoading: false,
        error: null
      };

    case "APPEND_USER_POSTS":
      return {
        ...state,
        userPosts: [...state.userPosts, ...action.payload.posts],
        userPostsPage: action.payload.page,
        hasMoreUserPosts: action.payload.hasMore,
        isLoading: false,
        error: null
      };

    case "SET_SELECTED_POST":
      return {
        ...state,
        selectedPost: action.payload.post,
        isLoading: false,
        error: null
      };

    case "POSTS_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };

    case "CLEAR_POSTS_ERROR":
      return {
        ...state,
        error: null
      };

    case "RESET_POSTS_STATE":
      return POSTS_INITIAL_STATE;

    default:
      return state;
  }
};
