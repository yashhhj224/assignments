
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type CommentsState = {
  comments: any[];
  isLoading: boolean;
  error: string | null;
};

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  error: null
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
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

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data.data;
  }
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (body: { postId: string; content: string }) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/posts/${body.postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content: body.content })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data.data;
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (body: { commentId: string }) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/comments/${body.commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return body.commentId;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload || [];
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed";
      })
      .addCase(createComment.fulfilled, (state, action) => {
        if (action.payload) {
          state.comments.push(action.payload);
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment: any) =>
            comment && comment._id !== action.payload
        );
      });
  }
});

export default commentsSlice.reducer;