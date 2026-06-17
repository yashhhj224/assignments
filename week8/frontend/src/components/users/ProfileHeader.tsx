
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Avatar from "../common/Avatar";
import FollowButton from "../common/FollowButton";
import EditProfileModal from "./EditProfileModal";
import { useAppDispatch } from "../../redux/hooks";
import { createOrGetConversationApi } from "../../api/chatApi";
import { addConversation, setActiveConversation } from "../../redux/slices/chatSlice";

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
  width: 100%;
`;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
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

const ActionWrapper = styled.div`
  margin-left: auto;
`;

const EditButton = styled.button`
  margin-left: auto;

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

  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMessage = async () => {
    const res = await createOrGetConversationApi(user._id);

    if (!res?.data) return;

    dispatch(addConversation(res.data));

    dispatch(
      setActiveConversation({
        conversationId: res.data._id,
        currentUserId: res.data.participants?.[0]?._id,
      })
    );

    navigate("/chat");
  };

  if (!user) return null;

  return (
    <>
      <Card>
        <Row>
          <Avatar src={user.profilePic} size={90} />

          <Info>
            <UsernameRow>
              <Username>{user.username}</Username>
                <ActionWrapper className="flex gap-3">
                  {isOwnProfile ? (
                    <EditButton onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </EditButton>
                  ) : (
                    <>
                      <FollowButton userId={user._id} />

                      <button
                        onClick={handleMessage}
                        className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition"
                      >
                        Message
                      </button>
                    </>
                  )}
                </ActionWrapper>
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