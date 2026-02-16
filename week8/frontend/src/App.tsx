
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./features/auth/authContext";
import { FollowProvider } from "./features/follow/followContext";
import { PostsProvider } from "./features/posts/postsContext";
import { UsersProvider } from "./features/users/usersContext";

const App = () => {
  return (
    <AuthProvider>
      <FollowProvider>
        <UsersProvider>
          <PostsProvider>
            <AppRoutes />
          </PostsProvider>
        </UsersProvider>
      </FollowProvider>
    </AuthProvider>
  );
};

export default App;
