import styled from "styled-components";
import { useAppSelector } from "../../redux/hooks";

const Bubble = styled.div<{ $own: boolean }>`
  align-self: ${({ $own }) =>
    $own ? "flex-end" : "flex-start"};
  background: ${({ $own }) =>
    $own ? "#4338ca" : "#f3f4f6"};
  color: ${({ $own }) =>
    $own ? "white" : "#111827"};
  padding: 12px 16px;
  border-radius: 16px;
  margin-bottom: 10px;
  max-width: 70%;
`;

const MessageBubble = ({ message }: any) => {
  const { user } = useAppSelector((state) => state.auth);

  const isOwn =
    message.sender === user?._id ||
    message.sender?._id === user?._id;

  return (
    <Bubble $own={isOwn}>
      {message.content}
    </Bubble>
  );
};

export default MessageBubble;
