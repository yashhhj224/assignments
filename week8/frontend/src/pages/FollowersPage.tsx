
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { useEffect } from "react";
import { fetchUserById } from "../redux/slices/usersSlice";
import UserLink from "../components/common/UserLink";
import FollowButton from "../components/common/FollowButton";

const Wrapper = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 40px;
  background: white;
  border-radius: 12px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;  /* 🔥 important */
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-weight: 600;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #4338ca;
  font-weight: 500;
`;

const UserRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.2s ease;

  &:hover {
    background: #f9fafb;
  }
`;

const FollowersPage = () => {
  const { userId } = useParams<{ userId: string }>();  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectedUser = useAppSelector(
    (state) => state.users.selectedUser
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  if (!selectedUser) return null;

  return (
    <Wrapper>
      <Header>
        <Title>Followers</Title>

        <BackBtn onClick={() => navigate(`/profile/${userId}`)}>
          ← Back
        </BackBtn>
      </Header>

      {selectedUser.followers?.length === 0 && (
        <p>No followers yet.</p>
      )}

      {selectedUser.followers
        ?.filter(
            (user: any) =>
            user &&
            typeof user === "object" &&
            user._id
        )
        .map((user: any) => (
            <UserRow key={user._id}>
              <UserLink user={user} />
              <FollowButton userId={user._id} />
            </UserRow>
        ))}
    </Wrapper>
  );
};

export default FollowersPage;