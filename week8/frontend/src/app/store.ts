
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import postsReducer from "../redux/slices/postsSlice";
import usersReducer from "../redux/slices/usersSlice";
import followReducer from "../redux/slices/followSlice";
import commentsReducer from "../redux/slices/commentsSlice";
import notificationReducer from "../redux/slices/notificationSlice";
import chatReducer from "../redux/slices/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    follow: followReducer,
    users: usersReducer,
    comments: commentsReducer,
    notifications: notificationReducer,
    chat: chatReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;