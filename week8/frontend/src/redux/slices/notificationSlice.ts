
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const API_BASE = "http://localhost:5000/api";

export interface Notification {
  _id: string;
  type: "LIKE" | "COMMENT" | "FOLLOW";
  read: boolean;
  createdAt: string;
  sender?: {
    _id: string;
    username: string;
    profilePic?: string;
  };
  postId?: {
    _id: string;
    title?: string;
  };
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/notifications`, {
        headers: getAuthHeaders(),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      return data.data.notifications || data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUnreadNotificationCount = createAsyncThunk(
  "notifications/fetchUnreadCount",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${API_BASE}/notifications/unread-count`,
        { headers: getAuthHeaders() }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      return data.data.unreadNotificationCount;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const markAllNotificationsRead = createAsyncThunk(
  "notifications/markAllRead",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${API_BASE}/notifications/read-all`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      return true;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const markSingleNotificationRead = createAsyncThunk(
  "notifications/markSingleRead",
  async (notificationId: string, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${API_BASE}/notifications/${notificationId}/read`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      return notificationId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Notification>) {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },
    setUnreadCount(state, action: PayloadAction<number>) {
      state.unreadCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(
          (n: Notification) => !n.read
        ).length;
      })

      .addCase(fetchUnreadNotificationCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
      })

      .addCase(markAllNotificationsRead.fulfilled, (state) => {
        state.notifications = state.notifications.map((n) => ({
          ...n,
          read: true,
        }));
        state.unreadCount = 0;
      })

      .addCase(markSingleNotificationRead.fulfilled, (state, action) => {
        const id = action.payload;
        const notification = state.notifications.find(
          (n) => n._id === id
        );

        if (notification && !notification.read) {
          notification.read = true;
          state.unreadCount = Math.max(state.unreadCount - 1, 0);
        }
      });
  },
});

export const { addNotification, setUnreadCount } =
  notificationSlice.actions;

export default notificationSlice.reducer;