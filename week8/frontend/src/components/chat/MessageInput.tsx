
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { sendMessage } from "../../redux/slices/chatSlice";
import { IoSend } from "react-icons/io5";

interface Props {
  inputRef: React.RefObject<HTMLInputElement>;
}

const MessageInput = ({ inputRef }: Props) => {
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
    <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center gap-4">
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-gray-100 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary break-words"
      />

      <button
        onClick={handleSend}
        className="bg-primary text-white p-3 rounded-full hover:opacity-90 transition flex items-center justify-center"
      >
        <IoSend size={18} />
      </button>
    </div>
  );
};

export default MessageInput;
