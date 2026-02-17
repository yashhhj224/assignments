
import { FollowButtonWrapper } from "../../styles/components/userStyles";

type FollowButtonProps = {
  isFollowing: boolean;
  isLoading: boolean;
  onFollow: () => void;
  onUnfollow: () => void;
};

const FollowButton = ({
  isFollowing,
  isLoading,
  onFollow,
  onUnfollow
}: FollowButtonProps) => {
  const handleClick = () => {
    if (isLoading) return;

    if (isFollowing) {
      onUnfollow();
    } else {
      onFollow();
    }
  };

  return (
    <FollowButtonWrapper
      disabled={isLoading}
      $isFollowing={isFollowing}
      onClick={handleClick}
    >
      {isLoading ? "Please wait..." : isFollowing ? "Unfollow" : "Follow"}
    </FollowButtonWrapper>
  );
};

export default FollowButton;
