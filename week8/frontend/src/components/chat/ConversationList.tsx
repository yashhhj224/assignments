
import { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    addConversation,
  fetchConversations,
  setActiveConversation,
} from "../../redux/slices/chatSlice";
import { createOrGetConversationApi } from "../../api/chatApi";
import { fetchMyFollowing } from "../../redux/slices/followSlice";

const Wrapper = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const Item = styled.div`
  padding: 16px;
  cursor: pointer;
  border-bottom: 1px solid #f3f4f6;

  &:hover {
    background: #f9fafb;
  }
`;

const Username = styled.div`
  font-weight: 600;
`;

const ConversationList = () => {
  const dispatch = useAppDispatch();

  const { conversations } =
    useAppSelector((state) => state.chat);

  const { following } = useAppSelector((state) => state.follow);

  const { user } =
    useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchConversations());
    dispatch(fetchMyFollowing());
  }, [dispatch]);
 
  const handleStartChat = async (userId: string) => {
    const res = await createOrGetConversationApi(userId);

    if (!res.success) {
        console.error("Conversation creation failed:", res);
        return;
    }

    const newConversation = res.data;

    if (!newConversation) return;

    dispatch(addConversation(newConversation));
    dispatch(setActiveConversation(newConversation._id));
  };

  return (
    <Wrapper>
      {conversations?.filter(Boolean).map((conv: any) => {
        if (!conv?.participants) return null;
        const otherUser = conv.participants.find(
          (p: any) => p._id !== user?._id
        );

        return (
          <Item
            key={conv._id}
            onClick={() => {
              console.log("Clicked:", conv._id);
              dispatch(setActiveConversation(conv._id));
            }}
          >
            <Username>
              {otherUser?.username}
            </Username>
          </Item>
        );
      })}
      {following
        ?.filter(
            (user) =>
            !conversations.some((c: any) =>
                c.participants.some((p: any) => p._id === user._id)
            )
        )
        .map((user) => (
            <Item
            key={user._id}
            onClick={() => handleStartChat(user._id)}
            >
            <Username>{user.username}</Username>
            </Item>
        ))}
    </Wrapper>
  );
};

export default ConversationList;