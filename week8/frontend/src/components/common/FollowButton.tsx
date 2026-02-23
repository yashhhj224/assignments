
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  followUser,
  unfollowUser
} from "../../redux/slices/followSlice";

const Button = styled.button<{ $active: boolean }>`
  padding: 6px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  background: ${({ $active }) =>
    $active ? "#e5e7eb" : "#4338ca"};
  color: ${({ $active }) =>
    $active ? "#111827" : "white"};
`;

type Props = {
  userId: string;
};

const FollowButton = ({ userId }: Props) => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(
    (state) => state.auth.user
  );

  const followingIds = useAppSelector(
    (state) => state.follow.followingIds
  );

  if (!currentUser || currentUser._id === userId) {
    return null;
  }

  const isFollowing = followingIds.includes(userId);

  const handleClick = () => {
    if (isFollowing) {
      dispatch(unfollowUser(userId));
    } else {
      dispatch(followUser(userId));
    }
  };

  return (
    <Button $active={isFollowing} onClick={handleClick}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;