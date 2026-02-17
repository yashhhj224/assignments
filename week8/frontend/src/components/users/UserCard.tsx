
import type { User } from "../../types/user";
import FollowButton from "./FollowButton";
import { useNavigate } from "react-router-dom";
import { resolveImageUrl } from "../../utils/url";
import {
  UserCardAvatar,
  UserCardAvatarPlaceholder,
  UserCardEmail,
  UserCardInfo,
  UserCardLeftSection,
  UserCardStats,
  UserCardUsername,
  UserCardWrapper
} from "../../styles/components/userStyles";

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
    <UserCardWrapper>
      <UserCardLeftSection>
        {user.profilePic ? (
          <UserCardAvatar src={resolveImageUrl(user.profilePic)} alt="profile" />
        ) : (
          <UserCardAvatarPlaceholder>
            {user.username.charAt(0).toUpperCase()}
          </UserCardAvatarPlaceholder>
        )}

        <UserCardInfo>
          <UserCardUsername onClick={handleUserClick}>
            @{user.username}
          </UserCardUsername>
          <UserCardEmail>{user.email}</UserCardEmail>

          <UserCardStats>
            <div>{user.followers.length} Followers</div>
            <div>{user.following.length} Following</div>
          </UserCardStats>
        </UserCardInfo>
      </UserCardLeftSection>

      <FollowButton
        isFollowing={isFollowing}
        isLoading={isLoading}
        onFollow={onFollow}
        onUnfollow={onUnfollow}
      />
    </UserCardWrapper>
  );
};

export default UserCard;
