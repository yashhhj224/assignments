
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchMessages } from "../../redux/slices/chatSlice";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MessagesArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
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

  const currentMessages =
    messages[activeConversationId || ""] || [];

  return (
    <Wrapper>
      <MessagesArea>
        {currentMessages.map((msg) => (
          <MessageBubble key={msg._id} message={msg} />
        ))}
      </MessagesArea>
      <MessageInput />
    </Wrapper>
  );
};

export default ChatWindow;
