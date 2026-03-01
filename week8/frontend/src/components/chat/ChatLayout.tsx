
import styled from "styled-components";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import { useAppSelector } from "../../redux/hooks";

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
  const { activeConversationId } = useAppSelector(
    (state) => state.chat
  );

  return (
    <Wrapper>
      <Left>
        <ConversationList />
      </Left>
      <Right>
        {activeConversationId && <ChatWindow />}
      </Right>
    </Wrapper>
  );
};

export default ChatLayout;
