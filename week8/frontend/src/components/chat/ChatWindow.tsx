
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useEffect } from "react";
import { fetchMessages } from "../../redux/slices/chatSlice";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #6b7280;
`;

const ChatWindow = () => {
  const dispatch = useAppDispatch();

  const { activeConversationId, messages } =
    useAppSelector((state) => state.chat);

  useEffect(() => {
    if (activeConversationId) {
      dispatch(fetchMessages(activeConversationId));
    }
  }, [activeConversationId, dispatch]);

  if (!activeConversationId)
    return <EmptyState>Select a user to start chatting</EmptyState>;

  const conversationMessages =
    messages[activeConversationId] || [];

  return (
    <Wrapper>
      <MessagesContainer>
        {conversationMessages.map((msg) => (
          <MessageBubble key={msg._id} message={msg} />
        ))}
      </MessagesContainer>

      <MessageInput />
    </Wrapper>
  );
};

export default ChatWindow;
