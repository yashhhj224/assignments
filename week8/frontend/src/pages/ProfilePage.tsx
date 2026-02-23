
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchUserById } from "../redux/slices/usersSlice";
import { fetchPostsByUser } from "../redux/slices/postsSlice";
import ProfileHeader from "../components/users/ProfileHeader";
import PostCard from "../components/posts/PostCard";

const Wrapper = styled.div`
  min-height: 100vh;
  background: #f3f4f6;
  padding: 10px 40px;
`;

const Container = styled.div`
  max-width: 900px;
  margin: auto;
`;

const EmptyText = styled.p`
  text-align: center;
  margin-top: 30px;
  color: #6b7280;
`;

const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useAppDispatch();

  const selectedUser = useAppSelector(
    (state) => state.users.selectedUser
  );

  const userPosts = useAppSelector(
    (state) => state.posts.userPosts
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
      dispatch(fetchPostsByUser(userId));
    }
  }, [userId, dispatch]);

  if (!userId) return null;

  return (
    <Wrapper>
      <Container>
        {/* Profile Header */}
        {selectedUser && (
          <ProfileHeader user={selectedUser} />
        )}

        {/* User Posts */}
        {userPosts && userPosts.length > 0 ? (
          userPosts.map((post: any) => (
            <PostCard key={post._id} post={post} />
          ))
        ) : (
          <EmptyText>No posts yet</EmptyText>
        )}
      </Container>
    </Wrapper>
  );
};

export default ProfilePage;