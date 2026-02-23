
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../../api/authApi";

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
  async (payload: { email: string; password: string }) => {
    const data = await loginApi(payload);
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

export const loadUserFromStorage = createAsyncThunk(
  "auth/loadUser",
  async () => {
    const token = localStorage.getItem("token");

    if (!token) return null;

    const res = await fetch("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
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
        state.error = null;
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
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        if (action.payload) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        }
    });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;