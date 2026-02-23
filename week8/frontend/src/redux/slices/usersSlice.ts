
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      });
  }
});

export default usersSlice.reducer;