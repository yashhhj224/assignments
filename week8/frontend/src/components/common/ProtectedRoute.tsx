
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useFollow } from "../../hooks/useFollow";
import { useUsers } from "../../hooks/useUsers";
import { usePosts } from "../../hooks/usePosts";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isAuthLoading } = useAuth();
  const { refreshFollowing } = useFollow();
  const { fetchUsers } = useUsers();
  const { refreshFeed } = usePosts();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    refreshFollowing();
    fetchUsers();
    refreshFeed();
  }, [isAuthenticated]);

  if (isAuthLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
