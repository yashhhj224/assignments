
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

type UserType = {
  _id: string;
  username: string;
  profilePic?: string | null;
};

type Props = {
  user: UserType;
  size?: number;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Username = styled.span`
  font-weight: 600;
`;

const UserLink: React.FC<Props> = ({ user, size }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${user._id}`);
  };

  return (
    <Wrapper onClick={handleClick}>
      <Avatar src={user.profilePic} size={size} />
      <Username>{user.username}</Username>
    </Wrapper>
  );
};

export default UserLink;