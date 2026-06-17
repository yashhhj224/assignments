
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchFeedApi,
  fetchPostByIdApi,
  fetchPostsByUserApi,
  toggleLikeApi
} from "../../api/postApi";

type PostsState = {
  posts: any[];
  selectedPost: any | null;
  userPosts: any[];
  comments: Record<string, any[]>;
  isLoading: boolean;
  error: string | null;
};

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  userPosts: [],
  comments: {},
  isLoading: false,
  error: null
};

export const fetchFeedPosts = createAsyncThunk(
  "posts/fetchFeed",
  async ({ page }: { page: number }) => {
    return await fetchFeedApi(page);
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchById",
  async (postId: string) => {
    return await fetchPostByIdApi(postId);
  }
);

export const createPost = createAsyncThunk(
  "posts/create",
  async (body: {
    title: string;
    content: string;
    tags: string[];
    images: string[];
  }) => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/update",
  async (body: {
    postId: string;
    title: string;
    content: string;
    tags: string[];
    images: string[];
  }) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/posts/${body.postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data.data;
  }
);

export const fetchPostsByUser = createAsyncThunk(
  "posts/fetchByUser",
  async (userId: string) => {
    return await fetchPostsByUserApi(userId);
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (postId: string) => {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return postId;
  }
);

export const toggleLike = createAsyncThunk(
  "posts/toggleLike",
  async (postId: string) => {
    const data = await toggleLikeApi(postId);
    return { postId, liked: data.liked };
  }
);

export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async (postId: string) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/posts/${postId}/comments`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();
    return { postId, comments: data.data };
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, content }: { postId: string; content: string }) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/posts/${postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content })
      }
    );

    const data = await res.json();
    return { postId, comment: data.data };
  }
);

export const uploadImages = createAsyncThunk(
  "posts/uploadImages",
  async (files: FileList) => {
    const token = localStorage.getItem("token");

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    const res = await fetch(
      "http://localhost:5000/api/uploads",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    );

    const data = await res.json();
    return data.data.images;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    incrementCommentsCount(state) {
      if (state.selectedPost) {
        state.selectedPost.commentsCount += 1;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeedPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.posts || action.payload;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.selectedPost = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        if (action.payload) {
          state.posts.unshift(action.payload);
        }
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.userPosts = action.payload;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { postId, liked } = action.payload;

        const updatePostLike = (post: any) => {
          post.isLikedByCurrentUser = liked;
          post.likesCount += liked ? 1 : -1;
        };

        const post = state.posts.find(p => p._id === postId);
        if (post) {
          updatePostLike(post);
        }

        if (state.selectedPost?._id === postId) {
          updatePostLike(state.selectedPost);
        }

        const userPost = state.userPosts.find(p => p._id === postId);
        if (userPost) {
          updatePostLike(userPost);
        }
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments[action.payload.postId] = action.payload.comments;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;

        if (!state.comments[postId]) {
          state.comments[postId] = [];
        }

        state.comments[postId].push(comment);

        if (state.selectedPost?._id === postId) {
          state.selectedPost.commentsCount += 1;
        }
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const previousLiked =
          state.selectedPost?.isLikedByCurrentUser;

        const previousLikesCount =
          state.selectedPost?.likesCount;

        state.selectedPost = {
          ...action.payload,
          isLikedByCurrentUser: previousLiked,
          likesCount: previousLikesCount
        };

        const index = state.posts.findIndex(
          (p) => p._id === action.payload._id
        );

        if (index !== -1) {
          state.posts[index] = {
            ...state.posts[index],
            ...action.payload,
            isLikedByCurrentUser: previousLiked,
            likesCount: previousLikesCount
          };
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (p) => p._id !== action.payload
        );

        if (state.selectedPost?._id === action.payload) {
          state.selectedPost = null;
        }
      });
  }
});

export const { incrementCommentsCount } = postsSlice.actions;
export default postsSlice.reducer;