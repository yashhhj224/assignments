
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Avatar from "../common/Avatar";
import FollowButton from "../common/FollowButton";
import EditProfileModal from "./EditProfileModal";

const Card = styled.div`
  position: relative;
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

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
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

const EditButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;

  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  background: #111827;
  color: white;
  font-weight: 500;

  transition: 0.2s ease;

  &:hover {
    background: #374151;
  }
`;

type Props = {
  user: any;
  isOwnProfile?: boolean;
};

const ProfileHeader = ({ user, isOwnProfile }: Props) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) return null;

  return (
    <>
      <Card>
        <Row>
          <Avatar src={user.profilePic} size={90} />

          <Info>
            <UsernameRow>
              <Username>{user.username}</Username>

              {!isOwnProfile && (
                <FollowButton userId={user._id} />
              )}
            </UsernameRow>

            <Meta>
              <Clickable
                onClick={() =>
                  navigate(`/profile/${user._id}/followers`)
                }
              >
                {user.followersCount || 0} Followers
              </Clickable>

              <Clickable
                onClick={() =>
                  navigate(`/profile/${user._id}/following`)
                }
              >
                {user.followingCount || 0} Following
              </Clickable>
            </Meta>
          </Info>
        </Row>

        {isOwnProfile && (
          <EditButton onClick={() => setIsEditing(true)}>
            Edit Profile
          </EditButton>
        )}
      </Card>

      {isEditing && (
        <EditProfileModal
          user={user}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
};

export default ProfileHeader;