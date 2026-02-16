
import type { Post } from "../../types/post";

export type PostsState = {
  feedPosts: Post[];
  userPosts: Post[];
  selectedPost: Post | null;

  feedPage: number;
  hasMoreFeed: boolean;

  userPostsPage: number;
  hasMoreUserPosts: boolean;

  isLoading: boolean;
  error: string | null;
};

export type PostsAction =
  | {
      type: "POSTS_LOADING_START";
    }
  | {
      type: "POSTS_LOADING_END";
    }
  | {
      type: "SET_FEED_POSTS";
      payload: {
        posts: Post[];
        page: number;
        hasMore: boolean;
      };
    }
  | {
      type: "APPEND_FEED_POSTS";
      payload: {
        posts: Post[];
        page: number;
        hasMore: boolean;
      };
    }
  | {
      type: "SET_USER_POSTS";
      payload: {
        posts: Post[];
        page: number;
        hasMore: boolean;
      };
    }
  | {
      type: "APPEND_USER_POSTS";
      payload: {
        posts: Post[];
        page: number;
        hasMore: boolean;
      };
    }
  | {
      type: "SET_SELECTED_POST";
      payload: {
        post: Post | null;
      };
    }
  | {
      type: "POSTS_ERROR";
      payload: {
        message: string;
      };
    }
  | {
      type: "CLEAR_POSTS_ERROR";
    }
  | {
      type: "RESET_POSTS_STATE";
    };
