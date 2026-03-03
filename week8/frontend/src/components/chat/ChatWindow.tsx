
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useEffect, useRef } from "react";
import { fetchMessages } from "../../redux/slices/chatSlice";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import UserLink from "../common/UserLink";

const ChatWindow = () => {
  const dispatch = useAppDispatch();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    activeConversationId,
    messages,
    conversations,
    onlineUsers,
  } = useAppSelector((state) => state.chat);

  const currentUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (activeConversationId) {
      dispatch(fetchMessages(activeConversationId));
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [activeConversationId, dispatch]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeConversationId]);

  if (!activeConversationId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
        Select a conversation
      </div>
    );
  }

  const conversation = conversations.find(
    (c) => c._id === activeConversationId
  );

  const otherUser = conversation?.participants.find(
    (p) => p._id !== currentUser?._id
  );

  const conversationMessages =
    messages[activeConversationId] || [];

  const isOnline =
    otherUser && onlineUsers.includes(otherUser._id);

  const unreadCount =
  conversation?.unreadCounts?.[currentUser?._id || ""] || 0;

const unreadStartIndex =
  unreadCount > 0
    ? conversationMessages.length - unreadCount
    : -1;

const shouldShowDivider =
  unreadCount > 0 &&
  activeConversationId === conversation?._id;

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        {otherUser && (
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
        )}
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden px-12 py-8 space-y-3 chat-scroll">
       {conversationMessages.map((msg, index) => (
  <div key={msg._id}>
    {shouldShowDivider &&
      index === unreadStartIndex && (
        <div className="flex items-center justify-center my-4">
          <div className="flex-1 h-[1px] bg-gray-200" />
          <span className="px-4 text-xs text-primary font-semibold tracking-wide">
            NEW MESSAGES
          </span>
          <div className="flex-1 h-[1px] bg-gray-200" />
        </div>
      )}

    <MessageBubble message={msg} />
  </div>
))}
        <div ref={bottomRef} />
      </div>

      <MessageInput inputRef={inputRef} />
    </>
  );
};

export default ChatWindow;
