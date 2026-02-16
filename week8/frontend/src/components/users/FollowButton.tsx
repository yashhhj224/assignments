
import styled from "styled-components";

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
    <Button
      disabled={isLoading}
      $isFollowing={isFollowing}
      onClick={handleClick}
    >
      {isLoading
        ? "Please wait..."
        : isFollowing
        ? "Unfollow"
        : "Follow"}
    </Button>
  );
};

export default FollowButton;

const Button = styled.button<{ $isFollowing: boolean }>`
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  border: 1px solid ${({ $isFollowing }) => ($isFollowing ? "#ff4d4d" : "#111")};

  background: ${({ $isFollowing }) => ($isFollowing ? "#ff4d4d" : "#111")};
  color: #fff;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
