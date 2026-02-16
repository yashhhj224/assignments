
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";

import FeedPage from "../pages/FeedPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import PostDetailPage from "../pages/PostDetailPage";
import CreatePostPage from "../pages/CreatePostPage";
import EditPostPage from "../pages/EditPostPage";

import { useAuth } from "../hooks/useAuth";
import Loader from "../components/common/Loader";

const AppRoutes = () => {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
        />

        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <FeedPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/:userId"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/posts/:postId"
          element={
            <ProtectedRoute>
              <PostDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePostPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-post/:postId"
          element={
            <ProtectedRoute>
              <EditPostPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
