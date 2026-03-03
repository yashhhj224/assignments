
import { useAppSelector } from "../../redux/hooks";

const MessageBubble = ({ message }: any) => {
  const { user } = useAppSelector((state) => state.auth);
  const isOwn = message.sender._id === user?._id;

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex flex-col ${
          isOwn ? "items-end" : "items-start"
        } max-w-[70%]`}
      >
        <div
          className={`
            px-5 py-3 text-sm rounded-2xl
            whitespace-pre-wrap
            break-words
            break-all
            overflow-hidden
            ${
              isOwn
                ? "bg-primary text-white rounded-br-md"
                : "bg-white border border-gray-200 rounded-bl-md"
            }
          `}
        >
          {message.content}
        </div>

        <span className="text-[11px] text-gray-400 mt-1">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
