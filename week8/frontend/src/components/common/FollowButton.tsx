
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  followUser,
  unfollowUser,
  fetchMyFollowing,
} from "../../redux/slices/followSlice";
import { useState, useEffect } from "react";

const Button = styled.button<{ $following: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s ease;

  background: ${({ $following }) =>
    $following ? "#e5e7eb" : "#4338ca"};

  color: ${({ $following }) =>
    $following ? "#111827" : "white"};
`;

interface Props {
  userId: string;
  username?: string;
}

const FollowButton = ({ userId, username }: Props) => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(
    (state) => state.auth.user
  );

  const followingList = useAppSelector(
    (state) => state.follow.following
  );

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const following =
      Array.isArray(followingList) &&
      followingList.some((u: any) => u._id === userId);

    setIsFollowing(following);
  }, [followingList, userId]);

  const handleClick = async () => {
    if (!currentUser) return;

    if (isFollowing) {
      const confirmUnfollow = window.confirm(
        `Do you want to unfollow ${username || "this user"}?`
      );

      if (!confirmUnfollow) return;

      setIsFollowing(false);

      await dispatch(unfollowUser(userId));
      dispatch(fetchMyFollowing());
    } else {
      setIsFollowing(true);

      await dispatch(followUser(userId));
    }
    
    await dispatch(fetchMyFollowing());
  };

  if (!currentUser || currentUser._id === userId) {
    return null;
  }

  return (
    <Button $following={isFollowing} onClick={handleClick}>
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
