
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Avatar from "../common/Avatar";

const Card = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 30px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.h2`
  margin: 0;
`;

const Meta = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 8px;
`;

const Clickable = styled.span`
  cursor: pointer;
  color: #4338ca;
`;

type Props = {
  user: any;
};

const ProfileHeader = ({ user }: Props) => {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <Card>
      <Row>
        <Avatar src={user.profilePic} size={90} />

        <Info>
          <Username>{user.username}</Username>

          <Meta>
            <Clickable
              onClick={() =>
                navigate(`/profile/${user._id}/followers`)
              }
            >
              {user.followers.length} Followers
            </Clickable>

            <Clickable
              onClick={() =>
                navigate(`/profile/${user._id}/following`)
              }
            >
              {user.following.length} Following
            </Clickable>
          </Meta>
        </Info>
      </Row>
    </Card>
  );
};

export default ProfileHeader;
