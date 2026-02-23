
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginApi,
  registerApi,
  updateProfileApi
} from "../../api/authApi";
import {
  fetchMyFollowing,
  followUser,
  unfollowUser
} from "./followSlice";

type AuthState = {
  user: any | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isLoading: false,
  error: null
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    payload: { email: string; password: string },
    { dispatch }
  ) => {
    const data = await loginApi(payload);
    dispatch(fetchMyFollowing());
    return data;
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload: {
    username: string;
    email: string;
    password: string;
  }) => {
    const data = await registerApi(payload);
    return data;
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData: FormData) => {
    const res = await updateProfileApi(formData);
    return res; 
  }
);

export const loadUserFromStorage = createAsyncThunk(
  "auth/loadUser",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const res = await fetch(
      "http://localhost:5000/api/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();

    dispatch(fetchMyFollowing());

    return { user: data.data, token };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      })

      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      })

      .addCase(followUser.fulfilled, (state) => {
        if (!state.user) return;
        state.user.followingCount =
          (state.user.followingCount || 0) + 1;
      })
      .addCase(unfollowUser.fulfilled, (state) => {
        if (!state.user) return;
        state.user.followingCount = Math.max(
          (state.user.followingCount || 1) - 1,
          0
        );
      })

      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data; // important
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || "Profile update failed";
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;