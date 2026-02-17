
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseApiErrorMessage } from "../../utils/errorParser";
import { followUserApi, unfollowUserApi, getFollowersApi, getFollowingApi, getFollowingByUserIdApi } from "../../api/followApi";
import type { User } from "../../types/user";

type FollowState = {
  followingIds: string[];
  isLoading: boolean;
  error: string | null;
  followersList: User[];
  followingList: User[];
};

const initialState: FollowState = {
  followingIds: [],
  isLoading: false,
  error: null,
  followersList: [],
  followingList: [],
};

export const fetchFollowing = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>("follow/fetchFollowing", async (_, thunkApi) => {
  try {
    const users = await getFollowingApi();
    return users.map((u) => u._id);
  } catch (error) {
    return thunkApi.rejectWithValue(parseApiErrorMessage(error));
  }
});

export const followUser = createAsyncThunk<void, string, { rejectValue: string }>(
  "follow/followUser",
  async (userId, thunkApi) => {
    try {
      await followUserApi(userId);
    } catch (error) {
      return thunkApi.rejectWithValue(parseApiErrorMessage(error));
    }
  }
);

export const unfollowUser = createAsyncThunk<void, string, { rejectValue: string }>(
  "follow/unfollowUser",
  async (userId, thunkApi) => {
    try {
      await unfollowUserApi(userId);
    } catch (error) {
      return thunkApi.rejectWithValue(parseApiErrorMessage(error));
    }
  }
);

export const fetchFollowersByUserId = createAsyncThunk<
  User[],
  string,
  { rejectValue: string }
>("follow/fetchFollowersByUserId", async (userId, thunkApi) => {
  try {
    return await getFollowersApi(userId);
  } catch (error) {
    return thunkApi.rejectWithValue(parseApiErrorMessage(error));
  }
});

export const fetchFollowingByUserId = createAsyncThunk<
  User[],
  string,
  { rejectValue: string }
>("follow/fetchFollowingByUserId", async (userId, thunkApi) => {
  try {
    return await getFollowingByUserIdApi(userId);
  } catch (error) {
    return thunkApi.rejectWithValue(parseApiErrorMessage(error));
  }
});

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    clearFollowError: (state) => {
      state.error = null;
    },
    resetFollowState: (state) => {
      state.followingIds = [];
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowing.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.followingIds = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(followUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        const userId = action.meta.arg;

        if (!state.followingIds.includes(userId)) {
          state.followingIds.push(userId);
        }

        state.isLoading = false;
        state.error = null;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(unfollowUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        const userId = action.meta.arg;

        state.followingIds = state.followingIds.filter((id) => id !== userId);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(fetchFollowersByUserId.fulfilled, (state, action) => {
        state.followersList = action.payload;
      })

      .addCase(fetchFollowingByUserId.fulfilled, (state, action) => {
        state.followingList = action.payload;
      })
  }
});

export const { clearFollowError, resetFollowState } = followSlice.actions;

export default followSlice.reducer;
