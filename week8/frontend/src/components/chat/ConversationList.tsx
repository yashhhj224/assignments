
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchConversations,
  setActiveConversation,
} from "../../redux/slices/chatSlice";
import Avatar from "../common/Avatar";

const ConversationList = () => {
  const dispatch = useAppDispatch();

  const {
    conversations,
    activeConversationId,
    onlineUsers,
  } = useAppSelector((state) => state.chat);

  const currentUser = useAppSelector((state) => state.auth.user);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  const filtered = conversations.filter((conv) => {
    const otherUser = conv.participants.find(
      (p) => p._id !== currentUser?._id
    );

    return otherUser?.username
      ?.toLowerCase()
      .includes(search.toLowerCase());
  });

  return (
    <>
      <div className="h-[75px] px-5  flex items-center border-b border-gray-200 bg-white">
        <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full bg-gray-100 px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {filtered.map((conv) => {
          const otherUser = conv.participants.find(
            (p) => p._id !== currentUser?._id
          );
          if (!otherUser) return null;

          const isActive =
            activeConversationId === conv._id;

          const isOnline = onlineUsers.includes(
            otherUser._id
          );

        const unreadCount =
          conv.unreadCounts?.[currentUser?._id || ""] || 0;


        const hasUnread = unreadCount > 0;

        return (
          <div
            key={conv._id}
            onClick={() =>
              dispatch(
                setActiveConversation({
                  conversationId: conv._id,
                  currentUserId: currentUser._id,
                })
              )
            }
          className={`flex items-center gap-4 px-6 py-5 cursor-pointer transition relative ${
            isActive
              ? "bg-primaryLight"
              : unreadCount > 0
              ? "bg-primaryLight/40"
              : "hover:bg-gray-50"
          }`}
          >
            <div className="relative">
              <Avatar
                src={otherUser.profilePic}
                size={42}
              />

              {isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className={`text-sm ${
                hasUnread ? "font-semibold text-gray-900" : "text-gray-900"
              }`}>
                {otherUser.username}
              </div>

              <div className={`text-xs truncate mt-1 ${
                hasUnread ? "font-semibold text-gray-800" : "text-gray-500"
              }`}>
                {conv.lastMessage && conv.lastMessage.trim() !== ""
                  ? conv.lastMessage
                  : "Start conversation"}
              </div>
            </div>

            {unreadCount > 0 && !isActive && (
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full" />
            )}
          </div>
          );
        })}
      </div>
    </>
  );
};

export default ConversationList;
