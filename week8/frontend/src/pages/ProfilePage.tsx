
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import FeedLayout from "../components/layout/FeedLayout";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import { PostCard } from "../components/posts/PostCard";
import FollowButton from "../components/users/FollowButton";
import { useUsersContext } from "../hooks/useUsersContext";
import { usePosts } from "../hooks/usePosts";
import { useFollow } from "../hooks/useFollow";
import { useAuth } from "../hooks/useAuth";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const ProfileCard = styled.div`
  width: 100%;
  padding: 18px;
  border-radius: 14px;
  border: 1px solid #ddd;
  background: #fff;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Avatar = styled.img`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  border: 1px solid #ddd;
  object-fit: cover;
`;

const AvatarPlaceholder = styled.div`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: #f3f3f3;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 900;
  font-size: 22px;
  color: #111;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Username = styled.div`
  font-size: 22px;
  font-weight: 900;
`;

const Email = styled.div`
  font-size: 14px;
  color: #666;
`;

const Stats = styled.div`
  display: flex;
  gap: 14px;
  font-size: 13px;
  font-weight: 800;
  color: #333;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
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

const ProfilePage = () => {
  const { userId } = useParams();
  const { authUser } = useAuth();

  const { selectedUser, fetchUserById, isLoading, error } = useUsersContext();
  const { userPosts, refreshUserPosts, fetchNextUserPostsPage, hasMoreUserPosts } =
    usePosts();

  const { followUser, unfollowUser, isFollowing, isLoading: followLoading } =
    useFollow();

  const isOwnProfile = useMemo(() => {
    return authUser?.id === userId;
  }, [authUser?.id, userId]);

  useEffect(() => {
    if (!userId) return;

    fetchUserById(userId);
    refreshUserPosts(userId);
  }, [userId]);

  if (isLoading && !selectedUser) {
    return (
      <FeedLayout>
        <Loader />
      </FeedLayout>
    );
  }

  return (
    <FeedLayout>
      <Wrapper>
        {error ? <ErrorMessage message={error} /> : null}

        {selectedUser ? (
          <ProfileCard>
            <Left>
              {selectedUser.profilePic ? (
                <Avatar src={selectedUser.profilePic} alt="profile" />
              ) : (
                <AvatarPlaceholder>
                  {selectedUser.username.charAt(0).toUpperCase()}
                </AvatarPlaceholder>
              )}

              <UserInfo>
                <Username>@{selectedUser.username}</Username>
                <Email>{selectedUser.email}</Email>

                <Stats>
                  <div>{selectedUser.followers.length} Followers</div>
                  <div>{selectedUser.following.length} Following</div>
                </Stats>
              </UserInfo>
            </Left>

            {!isOwnProfile ? (
              <FollowButton
                isFollowing={isFollowing(selectedUser._id)}
                isLoading={followLoading}
                onFollow={() => followUser(selectedUser._id)}
                onUnfollow={() => unfollowUser(selectedUser._id)}
              />
            ) : null}
          </ProfileCard>
        ) : null}

        <SectionTitle>Posts</SectionTitle>

        {userPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}

        {isLoading ? <Loader /> : null}

        {hasMoreUserPosts && !isLoading ? (
          <LoadMoreButton
            onClick={() => userId && fetchNextUserPostsPage(userId)}
          >
            Load More
          </LoadMoreButton>
        ) : null}
      </Wrapper>
    </FeedLayout>
  );
};

export default ProfilePage;
