
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import followReducer from "./slices/followSlice";
import postsReducer from "./slices/postsSlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    follow: followReducer,
    posts: postsReducer,
    users: usersReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
