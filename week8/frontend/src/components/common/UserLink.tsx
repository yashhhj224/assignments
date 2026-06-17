
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import React from "react";

type UserType = {
  _id: string;
  username: string;
  profilePic?: string | null;
};

type Props = {
  user: UserType;
  size?: number;
  showAvatar?: boolean;
  children?: React.ReactNode;
  className?: string;
};

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Username = styled.span`
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const UserLink: React.FC<Props> = ({
  user,
  size = 36,
  showAvatar = true,
  children,
  className,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${user._id}`);
  };

  return (
    <Wrapper onClick={handleClick} className={className}>
      {showAvatar && (
        <Avatar src={user.profilePic || undefined} size={size} />
      )}

      {children ? (
        children
      ) : (
        <Username>{user.username}</Username>
      )}
    </Wrapper>
  );
};

export default UserLink;
