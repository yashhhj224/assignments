
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { markSingleNotificationRead } from "../../redux/slices/notificationSlice";
import Avatar from "../common/Avatar";

const tabs = [
  { label: "All", value: "ALL" },
  { label: "Likes", value: "LIKE" },
  { label: "Comments", value: "COMMENT" },
  { label: "Followers", value: "FOLLOW" },
];

const NotificationList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector(
    (state) => state.notifications
  );

  const [activeTab, setActiveTab] = useState("ALL");

  const filteredNotifications = useMemo(() => {
    if (activeTab === "ALL") return notifications;
    return notifications.filter((n) => n.type === activeTab);
  }, [notifications, activeTab]);

  const handleClick = (n: any) => {
    if (!n.read) {
      dispatch(markSingleNotificationRead(n._id));
    }

    if (n.type === "FOLLOW") {
      navigate(`/profile/${n.sender?._id}`);
    }

    if (n.type === "LIKE" || n.type === "COMMENT") {
      navigate(`/post/${n.postId?._id}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 text-sm font-medium mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`pb-3 transition relative ${
              activeTab === tab.value
                ? "text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
            {activeTab === tab.value && (
              <div className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Notifications */}
      <div className="divide-y divide-gray-100">

        {filteredNotifications.length === 0 && (
          <div className="text-center text-gray-400 py-16 text-sm">
            No notifications yet.
          </div>
        )}

        {filteredNotifications.map((n) => {
  const dateObj = new Date(n.createdAt);

  return (
    <div
      key={n._id}
      onClick={() => handleClick(n)}
      className={`flex items-start gap-3 py-4 px-2 cursor-pointer transition ${
        !n.read
          ? "bg-primaryLight"
          : "hover:bg-gray-50"
      }`}
    >
      {/* Avatar */}
      <Avatar src={n.sender?.profilePic} size={36} />

      {/* Content */}
      <div className="flex-1">

        {/* Main Text */}
        <div className="text-sm text-gray-800 leading-snug">
          <span
            className="font-semibold hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${n.sender?._id}`);
            }}
          >
            {n.sender?.username}
          </span>{" "}

          {n.type === "FOLLOW" &&
            "started following you."}
          {n.type === "LIKE" &&
            "liked your post."}
          {n.type === "COMMENT" &&
            "commented on your post."}
        </div>

        {/* Timestamp */}
        <div className="text-xs text-gray-400 mt-1">
          {dateObj.toLocaleDateString()} | {" "}
          {dateObj.toLocaleTimeString()}
        </div>
      </div>

      {!n.read && (
        <div className="w-2 h-2 bg-primary rounded-full mt-2" />
      )}
    </div>
  )
})}
      </div>
    </div>
  );
};

export default NotificationList;
