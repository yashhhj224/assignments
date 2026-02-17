
import { useEffect } from "react";
import FeedLayout from "../components/layout/FeedLayout";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import { PostCard } from "../components/posts/PostCard";
import { usePosts } from "../hooks/usePosts";

import {
  FeedPageLoadMoreButton,
  FeedPageTitle,
  FeedPageWrapper
} from "../styles/pages/feedPageStyles";

const FeedPage = () => {
  const {
    feedPosts,
    isLoading,
    error,
    hasMoreFeed,
    fetchNextFeedPage,
    refreshFeed
  } = usePosts();

  useEffect(() => {
    refreshFeed();
  }, []);

  return (
    <FeedLayout>
      <FeedPageWrapper>
        <FeedPageTitle>Home Feed</FeedPageTitle>

        {error ? <ErrorMessage message={error} /> : null}

        {feedPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}

        {isLoading ? <Loader /> : null}

        {hasMoreFeed && !isLoading ? (
          <FeedPageLoadMoreButton onClick={fetchNextFeedPage}>
            Load More
          </FeedPageLoadMoreButton>
        ) : null}
      </FeedPageWrapper>
    </FeedLayout>
  );
};

export default FeedPage;
