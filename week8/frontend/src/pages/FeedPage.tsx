
import { useEffect } from "react";
import styled from "styled-components";
import FeedLayout from "../components/layout/FeedLayout";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import { PostCard } from "../components/posts/PostCard";
import { usePosts } from "../hooks/usePosts";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 900;
`;

const LoadMoreButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ddd;
  background: #f3f3f3;
  cursor: pointer;
  font-weight: 800;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

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
      <Wrapper>
        <Title>Home Feed</Title>

        {error ? <ErrorMessage message={error} /> : null}

        {feedPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}

        {isLoading ? <Loader /> : null}

        {hasMoreFeed && !isLoading ? (
          <LoadMoreButton onClick={fetchNextFeedPage}>
            Load More
          </LoadMoreButton>
        ) : null}
      </Wrapper>
    </FeedLayout>
  );
};

export default FeedPage;
