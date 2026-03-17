
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { sendMessage } from "../../redux/slices/chatSlice";
import { IoSend } from "react-icons/io5";

interface Props {
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

const MessageInput = ({ inputRef }: Props) => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const { activeConversationId } =
    useAppSelector((state) => state.chat);

  const handleSend = () => {
    const message = text.replace(/\s+/g, " ").trim();

    if (!message || !activeConversationId) return;

    dispatch(
      sendMessage({
        conversationId: activeConversationId,
        content: text,
      })
    );

    setText("");

    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-end gap-4">

    <textarea
      ref={inputRef}
      value={text}
      onChange={(e) => {
        setText(e.target.value);

        const el = e.target;

        el.style.height = "auto";

        const maxHeight = 150;

        if (el.scrollHeight > maxHeight) {
          el.style.height = maxHeight + "px";
          el.style.overflowY = "auto";
        } else {
          el.style.height = el.scrollHeight + "px";
          el.style.overflowY = "hidden";
        }
      }}
      onKeyDown={handleKeyDown}
      placeholder="Type a message..."
      rows={1}
      className="flex-1 bg-gray-100 rounded-2xl px-6 py-3 text-sm resize-none
      focus:outline-none focus:ring-2 focus:ring-primary
      overflow-y-auto no-scrollbar"
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
