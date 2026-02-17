
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthResponseData, LoginRequestBody, RegisterRequestBody } from "../../types/auth";
import { parseApiErrorMessage } from "../../utils/errorParser";
import { getProfileApi } from "../../api/userApi";
import { loginUserApi, registerUserApi } from "../../api/authApi";
import {
  clearAuthStorage,
  getAuthToken,
  getAuthUser,
  saveAuthToken,
  saveAuthUser
} from "../../utils/storage";

type AuthState = {
  authUser: AuthResponseData["user"] | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  authError: string | null;
};

const initialState: AuthState = {
  authUser: null,
  token: null,
  isAuthenticated: false,
  isAuthLoading: true,
  authError: null
};

export const registerUser = createAsyncThunk<
  AuthResponseData,
  RegisterRequestBody,
  { rejectValue: string }
>("auth/registerUser", async (payload, thunkApi) => {
  try {
    const response = await registerUserApi(payload);

    saveAuthToken(response.token);
    saveAuthUser(response.user);

    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(parseApiErrorMessage(error));
  }
});

export const loginUser = createAsyncThunk<
  AuthResponseData,
  LoginRequestBody,
  { rejectValue: string }
>("auth/loginUser", async (payload, thunkApi) => {
  try {
    const response = await loginUserApi(payload);

    saveAuthToken(response.token);
    saveAuthUser(response.user);

    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(parseApiErrorMessage(error));
  }
});

export const restoreAuthSession = createAsyncThunk<
  AuthResponseData | null,
  void,
  { rejectValue: string }
>("auth/restoreAuthSession", async (_, thunkApi) => {
  const token = getAuthToken();
  const user = getAuthUser();

  if (!token || !user) {
    clearAuthStorage();
    return null;
  }

  try {
    const profile = await getProfileApi();

    const updatedAuth: AuthResponseData = {
      token,
      user: {
        id: profile._id,
        username: profile.username,
        email: profile.email,
        profilePic: profile.profilePic,
        following: profile.following,
        followers: profile.followers
      }
    };

    saveAuthUser(updatedAuth.user);

    return updatedAuth;
  } catch (error) {
    clearAuthStorage();
    return thunkApi.rejectWithValue(parseApiErrorMessage(error));
  }
});

export const logoutUser = createAsyncThunk<void, void>(
  "auth/logoutUser",
  async () => {
    clearAuthStorage();
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.authError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isAuthLoading = true;
        state.authError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.authUser = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isAuthLoading = false;
        state.authError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.authError = action.payload || "Something went wrong";
      })

      .addCase(loginUser.pending, (state) => {
        state.isAuthLoading = true;
        state.authError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authUser = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isAuthLoading = false;
        state.authError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.authError = action.payload || "Something went wrong";
      })

      .addCase(restoreAuthSession.pending, (state) => {
        state.isAuthLoading = true;
        state.authError = null;
      })
      .addCase(restoreAuthSession.fulfilled, (state, action) => {
        if (!action.payload) {
          state.authUser = null;
          state.token = null;
          state.isAuthenticated = false;
          state.isAuthLoading = false;
          state.authError = null;
          return;
        }

        state.authUser = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isAuthLoading = false;
        state.authError = null;
      })
      .addCase(restoreAuthSession.rejected, (state, action) => {
        state.authUser = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isAuthLoading = false;
        state.authError = action.payload || "Something went wrong";
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.authUser = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isAuthLoading = false;
        state.authError = null;
      });
  }
});

export const { clearAuthError } = authSlice.actions;

export default authSlice.reducer;
