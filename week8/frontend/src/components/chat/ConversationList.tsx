
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchConversations,
  setActiveConversation,
} from "../../redux/slices/chatSlice";
import styled from "styled-components";

const Item = styled.div`
  padding: 16px;
  cursor: pointer;
  border-bottom: 1px solid #f3f4f6;

  &:hover {
    background: #f9fafb;
  }
`;

const ConversationList = () => {
  const dispatch = useAppDispatch();
  const { conversations } = useAppSelector(
    (state) => state.chat
  );

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  return (
    <>
      {conversations.map((conv) => (
        <Item
          key={conv._id}
          onClick={() =>
            dispatch(setActiveConversation(conv._id))
          }
        >
          <strong>
            {conv.participants[0]?.username}
          </strong>
          <div>{conv.lastMessage?.content}</div>
        </Item>
      ))}
    </>
  );
};

export default ConversationList;
