
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type FollowState = {
  followingIds: string[];
  isLoading: boolean;
  error: string | null;
};

const initialState: FollowState = {
  followingIds: [],
  isLoading: false,
  error: null
};

export const fetchMyFollowing = createAsyncThunk(
  "follow/fetchMyFollowing",
  async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/following",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();

    return data.data.map((user: any) => user._id);
  }
);

export const followUser = createAsyncThunk(
  "follow/followUser",
  async (userId: string) => {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/follow/${userId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return userId;
  }
);

export const unfollowUser = createAsyncThunk(
  "follow/unfollowUser",
  async (userId: string) => {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/follow/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return userId;
  }
);

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyFollowing.fulfilled, (state, action) => {
        state.followingIds = action.payload;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        if (!state.followingIds.includes(action.payload)) {
          state.followingIds.push(action.payload);
        }
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.followingIds = state.followingIds.filter(
          (id) => id !== action.payload
        );
      });
  }
});

export default followSlice.reducer;