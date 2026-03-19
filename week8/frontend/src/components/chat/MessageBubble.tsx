
import { useAppSelector } from "../../redux/hooks";

const MessageBubble = ({ message }: any) => {
  const { user } = useAppSelector((state) => state.auth);
  const { conversations, activeConversationId } = useAppSelector(
    (state) => state.chat
  );

  const isOwn = message.sender._id === user?._id;

  const conversation = conversations.find(
    (c) => c._id === activeConversationId
  );

  const otherUser = conversation?.participants.find(
    (p) => p._id !== user?._id
  );

  const isSeen =
    isOwn &&
    otherUser &&
    conversation &&
    !(conversation.unreadBy || []).includes(otherUser._id);

  const isGroup = message.conversationType === "GROUP";

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex flex-col ${
          isOwn ? "items-end" : "items-start"
        } max-w-[340px] min-w-0`}
      >
        {isGroup && (
          <span className="text-xs text-gray-500 mb-1">
            {isOwn ? "You" : message.sender.username}
          </span>
        )}

        {message.type === "TEXT" && (
          <div
            className={`px-4 py-3 text-sm rounded-2xl whitespace-pre-wrap break-words break-all max-w-[320px] ${
              isOwn
                ? "bg-primary text-white rounded-br-md"
                : "bg-white border border-gray-200 rounded-bl-md"
            }`}
          >
            {message.content}
          </div>
        )}

        {message.type === "MEDIA" && message.media?.length > 0 && (
          <div
            className={`grid gap-2 ${
              message.media.length === 1
                ? "grid-cols-1"
                : message.media.length === 2
                ? "grid-cols-2"
                : "grid-cols-2"
            } max-w-[260px]`}
          >
            {message.media.map((m: any, i: number) => (
              <div key={i} className="overflow-hidden rounded-xl">
                {m.type === "IMAGE" ? (
                  <img
                    src={`http://localhost:5000${m.url}`}
                    className="w-full h-full object-cover max-h-[200px]"
                  />
                ) : (
                  <video
                    src={`http://localhost:5000${m.url}`}
                    controls
                    className="w-full h-full object-cover max-h-[200px]"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 mt-1">
          <span className="text-[11px] text-gray-400">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {isOwn && (
            <span
              className={`text-[11px] ${
                isSeen ? "text-blue-500" : "text-gray-400"
              }`}
            >
              {isSeen ? "✔✔" : "✔"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
