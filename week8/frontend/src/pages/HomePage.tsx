
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchFeedPosts } from "../redux/slices/postsSlice";
import PostCard from "../components/posts/PostCard";
import Loader from "../components/ui/Loader";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(
    (state) => state.posts.posts
  );

  const isLoading = useAppSelector(
    (state) => state.posts.isLoading
  );

  useEffect(() => {
    dispatch(fetchFeedPosts({ page: 1 }));
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      {posts
        .filter((post) => post && post._id)
        .map((post) => (
          <PostCard key={post._id} post={post} />
      ))}
    </>
  );
};

export default HomePage;