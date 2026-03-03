
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface FollowingUser {
  _id: string;
  username: string;
  profilePic?: string;
}

type FollowState = {
  following: FollowingUser[];
  isLoading: boolean;
  error: string | null;
};

const initialState: FollowState = {
  following: [],
  isLoading: false,
  error: null,
};

const API_BASE = "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

export const fetchMyFollowing = createAsyncThunk(
  "follow/fetchMyFollowing",
  async () => {
    const res = await fetch(`${API_BASE}/following`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await res.json();
    return data.data;
  }
);

export const followUser = createAsyncThunk(
  "follow/followUser",
  async (userId: string) => {
    await fetch(`${API_BASE}/follow/${userId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return userId;
  }
);

export const unfollowUser = createAsyncThunk(
  "follow/unfollowUser",
  async (userId: string) => {
    await fetch(`${API_BASE}/follow/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

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
        state.following = action.payload;
      })

      .addCase(followUser.fulfilled, (state, action) => {
      })

      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.following = state.following.filter(
          (u) => u._id !== action.payload
        );
      });
  },
});

export default followSlice.reducer;
