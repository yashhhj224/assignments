
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/user";
import { parseApiErrorMessage } from "../../utils/errorParser";
import { getAllUsersApi, getUserByIdApi } from "../../api/userApi";

type UsersState = {
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  users: [],
  selectedUser: null,
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

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsersError: (state) => {
      state.error = null;
    },
    resetUsersState: () => {
      return initialState;
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
      });
  }
});

export const { clearUsersError, resetUsersState } = usersSlice.actions;

export default usersSlice.reducer;
