
import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import { setActiveConversation } from "../../redux/slices/chatSlice";

const Wrapper = styled.div`
  padding: 16px;
  cursor: pointer;
  border-bottom: 1px solid #f3f4f6;

  &:hover {
    background: #f9fafb;
  }
`;

const Name = styled.div`
  font-weight: 600;
`;

const LastMessage = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

const ConversationItem = ({ conversation }: any) => {
  const dispatch = useAppDispatch();

  return (
    <Wrapper
      onClick={() =>
        dispatch(setActiveConversation(conversation._id))
      }
    >
      <Name>{conversation.chatUser?.username}</Name>

      <LastMessage>
        {conversation.lastMessage}
      </LastMessage>
    </Wrapper>
  );
};

export default ConversationItem;
