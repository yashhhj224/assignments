
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { followUser, unfollowUser } from "./followSlice";
import { updateProfile } from "./authSlice";

type UsersState = {
  selectedUser: any | null;
  users: any[];
  searchResults: any[];
  isLoading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  selectedUser: null,
  users: [],
  searchResults: [],
  isLoading: false,
  error: null
};

export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (userId: string) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();
    return data.data;
  }
);

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();
    return data.data;
  }
);

export const searchUsers = createAsyncThunk(
  "users/search",
  async (query: string) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/users/search?query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();
    return data.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })

      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })

      .addCase(searchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.isLoading = false;
      })
      .addCase(searchUsers.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(followUser.fulfilled, (state, action) => {
        const targetUserId = action.payload;

        const updateFollowers = (user: any) => {
          if (user._id === targetUserId) {
            user.followersCount =
              (user.followersCount || 0) + 1;
          }
        };

        state.users.forEach(updateFollowers);
        state.searchResults.forEach(updateFollowers);

        if (state.selectedUser?._id === targetUserId) {
          state.selectedUser.followersCount =
            (state.selectedUser.followersCount || 0) + 1;
        }
      })

      .addCase(unfollowUser.fulfilled, (state, action) => {
        const targetUserId = action.payload;

        const updateFollowers = (user: any) => {
          if (user._id === targetUserId) {
            user.followersCount =
              Math.max((user.followersCount || 1) - 1, 0);
          }
        };

        state.users.forEach(updateFollowers);
        state.searchResults.forEach(updateFollowers);

        if (state.selectedUser?._id === targetUserId) {
          state.selectedUser.followersCount =
            Math.max(
              (state.selectedUser.followersCount || 1) - 1,
              0
            );
        }
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        const updatedUser = action.payload.data;

        if (state.selectedUser?._id === updatedUser._id) {
          state.selectedUser = updatedUser;
        }

        state.users = state.users.map((user: any) =>
          user._id === updatedUser._id ? updatedUser : user
        );
      }
    );
  }
});

export default usersSlice.reducer;