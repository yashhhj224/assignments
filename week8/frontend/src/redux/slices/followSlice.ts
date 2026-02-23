
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type FollowState = {
  isLoading: boolean;
};

const initialState: FollowState = {
  isLoading: false
};

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
  extraReducers: () => {}
});

export default followSlice.reducer;