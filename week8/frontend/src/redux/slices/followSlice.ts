
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

export const fetchMyFollowing = createAsyncThunk(
  "follow/fetchMyFollowing",
  async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/following",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    return data.data; // full user objects
  }
);

export const followUser = createAsyncThunk(
  "follow/followUser",
  async (user: FollowingUser) => {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/follow/${user._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return user;
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
          Authorization: `Bearer ${token}`,
        },
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
        state.following = action.payload;
      })

      .addCase(followUser.fulfilled, (state, action) => {
        const exists = state.following.some(
          (u) => u._id === action.payload._id
        );

        if (!exists) {
          state.following.push(action.payload);
        }
      })

      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.following = state.following.filter(
          (u) => u._id !== action.payload
        );
      });
  },
});

export default followSlice.reducer;