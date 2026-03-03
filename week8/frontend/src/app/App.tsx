
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { loadUserFromStorage } from "../redux/slices/authSlice";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import CreatePostPage from "../pages/CreatePostPage";
import PostDetailPage from "../pages/PostDetailPage";
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import FeedLayout from "../components/layout/FeedLayout";
import FollowersPage from "../pages/FollowersPage";
import FollowingPage from "../pages/FollowingPage";
import UsersPage from "../pages/UserPage";
import NotificationsPage from "../pages/NotificationsPage";
import ChatPage from "../pages/ChatPage";
import { initializeSocket } from "../socket";
import { store } from "./store";
import { setOnlineUsers } from "../redux/slices/chatSlice";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAppSelector((state) => state.auth);
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAppSelector((state) => state.auth);
  if (token) return <Navigate to="/home" replace />;
  return children;
};

const App = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

useEffect(() => {
  if (!token) return;

  const socket = initializeSocket(token);

  socket.on("new_notification", (notification) => {
    store.dispatch({
      type: "notifications/addNotification",
      payload: notification,
    });
  });

  socket.on("notification_unread_updated", (data) => {
    store.dispatch({
      type: "notifications/setUnreadCount",
      payload: data.unreadNotificationCount,
    });
  });

  socket.on("online_users", (users: string[]) => {
    store.dispatch(setOnlineUsers(users));
  });

  return () => {
    socket.off("new_notification");
    socket.off("notification_unread_updated");
    socket.off("online_users");
  };
}, [token]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />

      <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route path="/register" element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      <Route element={
        <ProtectedRoute>
            <FeedLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<HomePage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/profile/:userId/followers" element={<FollowersPage />} />
        <Route path="/profile/:userId/following" element={<FollowingPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/chat" element={<ChatPage />} />

      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;