
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APP_CONSTANTS } from "../../constants/appConstants";
import type { CreatePostRequestBody, Post, UpdatePostRequestBody } from "../../types/post";
import { parseApiErrorMessage } from "../../utils/errorParser";
import { createPostApi, deletePostApi, getFeedApi, getPostByIdApi, getPostsByUserApi, updatePostApi } from "../../api/postApi";

type PostsState = {
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

const initialState: PostsState = {
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

export const fetchFeedPosts = createAsyncThunk<
  { posts: Post[]; page: number; hasMore: boolean },
  number,
  { rejectValue: string }
>("posts/fetchFeedPosts", async (page, thunkApi) => {
  try {
    const posts = await getFeedApi(page, APP_CONSTANTS.DEFAULT_FEED_LIMIT);

    return {
      posts,
      page: page + 1,
      hasMore: posts.length === APP_CONSTANTS.DEFAULT_FEED_LIMIT
    };
  } catch (error) {
    return thunkApi.rejectWithValue(parseApiErrorMessage(error));
  }
});

export const fetchUserPosts = createAsyncThunk<
  { posts: Post[]; page: number; hasMore: boolean; userId: string },
  { userId: string; page: number },
  { rejectValue: string }
>("posts/fetchUserPosts", async ({ userId, page }, thunkApi) => {
  try {
    const posts = await getPostsByUserApi(userId, page, APP_CONSTANTS.DEFAULT_FEED_LIMIT);

    return {
      posts,
      page: page + 1,
      hasMore: posts.length === APP_CONSTANTS.DEFAULT_FEED_LIMIT,
      userId
    };
  } catch (error) {
    return thunkApi.rejectWithValue(parseApiErrorMessage(error));
  }
});

export const fetchPostById = createAsyncThunk<Post, string, { rejectValue: string }>(
  "posts/fetchPostById",
  async (postId, thunkApi) => {
    try {
      return await getPostByIdApi(postId);
    } catch (error) {
      return thunkApi.rejectWithValue(parseApiErrorMessage(error));
    }
  }
);

export const createPost = createAsyncThunk<Post, CreatePostRequestBody, { rejectValue: string }>(
  "posts/createPost",
  async (payload, thunkApi) => {
    try {
      return await createPostApi(payload);
    } catch (error) {
      return thunkApi.rejectWithValue(parseApiErrorMessage(error));
    }
  }
);

export const updatePost = createAsyncThunk<
  Post,
  { postId: string; payload: UpdatePostRequestBody },
  { rejectValue: string }
>("posts/updatePost", async ({ postId, payload }, thunkApi) => {
  try {
    return await updatePostApi(postId, payload);
  } catch (error) {
    return thunkApi.rejectWithValue(parseApiErrorMessage(error));
  }
});

export const deletePost = createAsyncThunk<void, string, { rejectValue: string }>(
  "posts/deletePost",
  async (postId, thunkApi) => {
    try {
      await deletePostApi(postId);
    } catch (error) {
      return thunkApi.rejectWithValue(parseApiErrorMessage(error));
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPostsError: (state) => {
      state.error = null;
    },
    resetPostsState: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeedPosts.fulfilled, (state, action) => {
       state.feedPosts = [...state.feedPosts, ...action.payload.posts];
        state.feedPage = action.payload.page;
        state.hasMoreFeed = action.payload.hasMore;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchFeedPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(fetchUserPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.userPosts = [...state.userPosts, ...action.payload.posts];
        state.userPostsPage = action.payload.page;
        state.hasMoreUserPosts = action.payload.hasMore;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(fetchPostById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.selectedPost = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  }
});

export const { clearPostsError, resetPostsState } = postsSlice.actions;

export default postsSlice.reducer;
