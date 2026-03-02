
import styled from "styled-components";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import { useAppDispatch } from "../../redux/hooks";
import { useEffect } from "react";
import { getSocket } from "../../socket";
import {
  receiveMessage,
  updateConversationLastMessage,
} from "../../redux/slices/chatSlice";

const Wrapper = styled.div`
  display: flex;
  height: 75vh;
  background: white;
  border-radius: 20px;
  overflow: hidden;
`;

const Left = styled.div`
  width: 35%;
  border-right: 1px solid #e5e7eb;
`;

const Right = styled.div`
  flex: 1;
`;

const ChatLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = getSocket();

    if (!socket) return;

    const handleNewMessage = (message: any) => {
        dispatch(receiveMessage(message));
        dispatch(updateConversationLastMessage(message));
    };

    socket.on("new_message", handleNewMessage);

    return () => {
        socket.off("new_message", handleNewMessage);
    };
    }, [dispatch]);

  return (
    <Wrapper>
      <Left>
        <ConversationList />
      </Left>
      <Right>
        <ChatWindow />
      </Right>
    </Wrapper>
  );
};

export default ChatLayout;