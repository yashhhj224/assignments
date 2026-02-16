
import styled from "styled-components";
import type { User } from "../../types/user";
import FollowButton from "./FollowButton";
import { useNavigate } from "react-router-dom";

type UserCardProps = {
  user: User;
  isFollowing: boolean;
  isLoading: boolean;
  onFollow: () => void;
  onUnfollow: () => void;
};

const UserCard = ({
  user,
  isFollowing,
  isLoading,
  onFollow,
  onUnfollow
}: UserCardProps) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(`/profile/${user._id}`);
  };

  return (
    <Card>
      <LeftSection>
        {user.profilePic ? (
          <Avatar src={user.profilePic} alt="profile" />
        ) : (
          <AvatarPlaceholder>
            {user.username.charAt(0).toUpperCase()}
          </AvatarPlaceholder>
        )}

        <UserInfo>
          <Username onClick={handleUserClick}>@{user.username}</Username>
          <Email>{user.email}</Email>

          <Stats>
            <div>{user.followers.length} Followers</div>
            <div>{user.following.length} Following</div>
          </Stats>
        </UserInfo>
      </LeftSection>

      <FollowButton
        isFollowing={isFollowing}
        isLoading={isLoading}
        onFollow={onFollow}
        onUnfollow={onUnfollow}
      />
    </Card>
  );
};

export default UserCard;

const Card = styled.div`
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid #ddd;
  background: #fff;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid #ddd;
  object-fit: cover;
`;

const AvatarPlaceholder = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: #f3f3f3;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 900;
  font-size: 18px;
  color: #111;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Username = styled.div`
  font-size: 15px;
  font-weight: 900;
  color: #111;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Email = styled.div`
  font-size: 13px;
  color: #666;
`;

const Stats = styled.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  font-weight: 700;
  color: #444;
  margin-top: 4px;
`;
