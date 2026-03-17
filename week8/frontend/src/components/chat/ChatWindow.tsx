
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useEffect, useRef, useState } from "react";
import { fetchMessages, setCurrentUserId } from "../../redux/slices/chatSlice";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import UserLink from "../common/UserLink";

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
  } = useAppSelector((state) => state.chat);

  const currentUser = useAppSelector((state) => state.auth.user);

  const [showDivider, setShowDivider] = useState(true);
  const [initialLastReadId, setInitialLastReadId] = useState<string | null>(null);

  const conversation = conversations.find(
    (c) => c._id === activeConversationId
  );

  const conversationMessages =
    messages?.[activeConversationId || ""] ?? [];

  const otherUser = conversation?.participants.find(
    (p) => p._id !== currentUser?._id
  );

  const isOnline =
    otherUser && onlineUsers.includes(otherUser._id.toString());

  const dividerIndex = (() => {
    if (!initialLastReadId) return null;

    const lastReadMessage = conversationMessages.find(
      (m) => m._id === initialLastReadId
    );

    if (!lastReadMessage) return null;

    const index = conversationMessages.findIndex(
      (m) => new Date(m.createdAt) > new Date(lastReadMessage.createdAt)
    );

    if (index === -1) return null;

    const firstUnread = conversationMessages[index];

    if (firstUnread.receiver._id !== currentUser?._id) {
      return null;
    }

    return index;
  })();

  useEffect(() => {
    if (!activeConversationId || !conversation || !currentUser) return;

    dispatch(setCurrentUserId(currentUser._id));

    const prevLastRead =
      conversation.lastReadMessageIds?.[currentUser._id] ?? null;

    setInitialLastReadId(prevLastRead);

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
        behavior: "auto",
      });
    }
  }, [conversationMessages.length, dividerIndex]);

  useEffect(() => {
    if (dividerIndex === null) return;

    setShowDivider(true);

    const timer = setTimeout(() => {
      setShowDivider(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [dividerIndex]);

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
          <div
            key={msg._id}
            ref={index === dividerIndex ? dividerRef : null}
          >
            {dividerIndex !== null &&
              showDivider &&
              index === dividerIndex && (
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
