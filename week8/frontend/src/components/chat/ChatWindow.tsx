
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useEffect, useRef, useState } from "react";
import { fetchMessages, setCurrentUserId } from "../../redux/slices/chatSlice";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import UserLink from "../common/UserLink";
import GroupInfoModal from "./GroupInfoModal";

const ChatWindow = () => {
  const dispatch = useAppDispatch();

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const {
    activeConversationId,
    messages,
    conversations,
    onlineUsers,
    typingUsers,
  } = useAppSelector((state) => state.chat);

  const currentUser = useAppSelector((state) => state.auth.user);

  const conversation = conversations.find(
    (c) => c._id === activeConversationId
  );

  const conversationMessages =
    messages?.[activeConversationId || ""] ?? [];

  const isGroup = conversation?.type === "GROUP";

  const otherUser = !isGroup
    ? conversation?.participants.find(
        (p) => p._id !== currentUser?._id
      )
    : null;

  const isOnline =
    !isGroup &&
    otherUser &&
    onlineUsers.includes(otherUser._id.toString());

  const [showGroupInfo, setShowGroupInfo] = useState(false);

  useEffect(() => {
    if (!activeConversationId || !conversation || !currentUser) return;

    dispatch(setCurrentUserId(currentUser._id));

    dispatch(fetchMessages(activeConversationId));

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [activeConversationId, currentUser]);

  useEffect(() => {
    if (!activeConversationId) return;

    if (dividerRef.current) {
      dividerRef.current.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    } else {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [conversationMessages.length]);

  if (!activeConversationId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
        Select a conversation
      </div>
    );
  }

  if (!conversation || !currentUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="bg-white border-b border-gray-200 px-8 h-[75px] flex items-center">
        <div className="flex items-center gap-3 h-full">
          
          {isGroup ? (
            <div
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
              onClick={() => {
                setShowGroupInfo(true)
              }}
            >
              {showGroupInfo && (
                <GroupInfoModal
                  conversation={conversation}
                  onClose={() => setShowGroupInfo(false)}
                />
              )}

              <img
                src={
                  conversation.groupAvatar
                    ? `http://localhost:5000/${conversation.groupAvatar}`
                    : "/default-group-avatar.png"
                }
                className="w-9 h-9 rounded-full object-cover"
              />

              <div className="font-medium text-sm">
                {conversation.groupName}
              </div>
            </div>
          ) : (
            otherUser && (
              <UserLink user={otherUser}>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col leading-tight">
                    <div className="font-medium text-sm">
                      {otherUser.username}
                    </div>

                    {isOnline && (
                      <div className="text-xs text-green-500">
                        Online
                      </div>
                    )}
                  </div>
                </div>
              </UserLink>
            )
          )}

        </div>
      </div>

      {typingUsers[activeConversationId || ""] && (
        <div className="px-8 py-2 bg-white border-b border-gray-100 flex items-center gap-2">
          <span className="text-xs text-gray-500">
            {isGroup
              ? "Someone"
              : otherUser?.username}
          </span>

          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 chat-scroll">
         {conversationMessages.map((msg) => (
          <div key={msg._id}>
            <MessageBubble message={msg} />
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      <MessageInput inputRef={inputRef} />
    </div>
  );
};

export default ChatWindow;
