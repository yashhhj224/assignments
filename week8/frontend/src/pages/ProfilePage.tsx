
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import FeedLayout from "../components/layout/FeedLayout";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import { PostCard } from "../components/posts/PostCard";
import FollowButton from "../components/users/FollowButton";
import { useUsers } from "../hooks/useUsers";
import { usePosts } from "../hooks/usePosts";
import { useFollow } from "../hooks/useFollow";
import { useAuth } from "../hooks/useAuth";
import { resolveImageUrl } from "../utils/url";
import {
  ProfileAvatar,
  ProfileAvatarPlaceholder,
  ProfileCard,
  ProfileEmail,
  ProfileLeft,
  ProfileLoadMoreButton,
  ProfilePageWrapper,
  ProfileSectionTitle,
  ProfileStats,
  ProfileUserInfo,
  ProfileUsername
} from "../styles/pages/profilePageStyles";

const ProfilePage = () => {
  const { userId } = useParams();
  const { authUser } = useAuth();

  const { selectedUser, fetchUserById, isLoading, error } = useUsers();

  const {
    userPosts,
    refreshUserPosts,
    fetchNextUserPostsPage,
    hasMoreUserPosts
  } = usePosts();

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
      <ProfilePageWrapper>
        {error ? <ErrorMessage message={error} /> : null}

        {selectedUser ? (
          <ProfileCard>
            <ProfileLeft>
              {selectedUser.profilePic ? (
                <ProfileAvatar
                  src={resolveImageUrl(selectedUser.profilePic)}
                  alt="profile"
                />
              ) : (
                <ProfileAvatarPlaceholder>
                  {selectedUser.username.charAt(0).toUpperCase()}
                </ProfileAvatarPlaceholder>
              )}

              <ProfileUserInfo>
                <ProfileUsername>@{selectedUser.username}</ProfileUsername>
                <ProfileEmail>{selectedUser.email}</ProfileEmail>

                <ProfileStats>
                  <div>{selectedUser.followers.length} Followers</div>
                  <div>{selectedUser.following.length} Following</div>
                </ProfileStats>
              </ProfileUserInfo>
            </ProfileLeft>

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

        <ProfileSectionTitle>Posts</ProfileSectionTitle>

        {userPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}

        {isLoading ? <Loader /> : null}

        {hasMoreUserPosts && !isLoading ? (
          <ProfileLoadMoreButton
            onClick={() => userId && fetchNextUserPostsPage(userId)}
          >
            Load More
          </ProfileLoadMoreButton>
        ) : null}
      </ProfilePageWrapper>
    </FeedLayout>
  );
};

export default ProfilePage;
