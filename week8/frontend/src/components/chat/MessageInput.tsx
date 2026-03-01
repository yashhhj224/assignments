
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { sendMessage } from "../../redux/slices/chatSlice";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  padding: 12px;
  border-top: 1px solid #e5e7eb;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 10px 16px;
  border-radius: 20px;
  background: #4338ca;
  color: white;
  border: none;
`;

const MessageInput = () => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  const { activeConversationId } =
    useAppSelector((state) => state.chat);

  const handleSend = () => {
    if (!text.trim() || !activeConversationId) return;

    dispatch(
      sendMessage({
        conversationId: activeConversationId,
        content: text,
      })
    );

    setText("");
  };

  return (
    <Wrapper>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <Button onClick={handleSend}>Send</Button>
    </Wrapper>
  );
};

export default MessageInput;
