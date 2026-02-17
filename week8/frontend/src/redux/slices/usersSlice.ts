
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/user";
import { parseApiErrorMessage } from "../../utils/errorParser";
import { getAllUsersApi, getUserByIdApi } from "../../api/userApi";
import { searchUsersApi } from "../../api/userApi";
import { followUser, unfollowUser } from "./followSlice";

type UsersState = {
  users: User[];
  selectedUser: User | null;
  searchResults: User[],
  isLoading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  searchResults: [],
  isLoading: false,
  error: null
};

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "users/fetchUsers",
  async (_, thunkApi) => {
    try {
      return await getAllUsersApi();
    } catch (error) {
      return thunkApi.rejectWithValue(parseApiErrorMessage(error));
    }
  }
);

export const fetchUserById = createAsyncThunk<User, string, { rejectValue: string }>(
  "users/fetchUserById",
  async (userId, thunkApi) => {
    try {
      return await getUserByIdApi(userId);
    } catch (error) {
      return thunkApi.rejectWithValue(parseApiErrorMessage(error));
    }
  }
);

export const searchUsers = createAsyncThunk<
  User[],
  string,
  { rejectValue: string }
>("users/searchUsers", async (query, thunkApi) => {
  try {
    return await searchUsersApi(query);
  } catch (error) {
    return thunkApi.rejectWithValue(parseApiErrorMessage(error));
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsersError: (state) => {
      state.error = null;
    },
    resetUsersState: () => {
      return initialState;
    },
    incrementFollowerCount: (state, action) => {
      if (state.selectedUser && state.selectedUser._id === action.payload) {
        state.selectedUser.followers.push("temp");
      }
    },
    decrementFollowerCount: (state, action) => {
      if (state.selectedUser && state.selectedUser._id === action.payload) {
        state.selectedUser.followers.pop();
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(searchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.isLoading = false;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(followUser.fulfilled, (state, action) => {
        const followedUserId = action.meta.arg;

        if (state.selectedUser && state.selectedUser._id === followedUserId) {
          state.selectedUser.followers = [
            ...state.selectedUser.followers,
            "optimistic"
          ];
        }

        if (state.selectedUser && state.selectedUser._id !== followedUserId) {
          state.selectedUser.following = [
            ...state.selectedUser.following,
            followedUserId
          ];
        }
      })

      .addCase(unfollowUser.fulfilled, (state, action) => {
        const unfollowedUserId = action.meta.arg;

        if (state.selectedUser && state.selectedUser._id === unfollowedUserId) {
          state.selectedUser.followers =
            state.selectedUser.followers.slice(0, -1);
        }

        if (state.selectedUser) {
          state.selectedUser.following =
            state.selectedUser.following.filter(
              id => id !== unfollowedUserId
            );
        }
      })
    }
});

export const { clearUsersError, resetUsersState, incrementFollowerCount, decrementFollowerCount } = usersSlice.actions;

export default usersSlice.reducer;
