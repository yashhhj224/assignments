
import styled from "styled-components";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { markSingleNotificationRead } from "../../redux/slices/notificationSlice";

const TabsRow = styled.div`
  display: flex;
  gap: 24px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 20px;
`;

const Tab = styled.div<{ $active: boolean }>`
  padding-bottom: 10px;
  cursor: pointer;
  font-weight: 500;
  color: ${({ $active }) =>
    $active ? "#4338ca" : "#6b7280"};
  border-bottom: ${({ $active }) =>
    $active ? "2px solid #4338ca" : "2px solid transparent"};
`;

const NotificationCard = styled.div<{ $unread: boolean }>`
  padding: 18px;
  border-radius: 16px;
  margin-bottom: 14px;
  background: ${({ $unread }) =>
    $unread ? "#eef2ff" : "#f9fafb"};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  }
`;

const NotificationRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Text = styled.div`
  font-size: 14px;
  color: #374151;
`;

const Username = styled.span`
  font-weight: 600;
`;

const Time = styled.div`
  font-size: 12px;
  color: #9ca3af;
  margin-top: 6px;
`;

const UnreadDot = styled.div`
  width: 8px;
  height: 8px;
  background: #4338ca;
  border-radius: 50%;
  margin-left: 10px;
`;

const EmptyState = styled.div`
  padding: 40px;
  text-align: center;
  color: #9ca3af;
`;

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

  const handleClick = (notification: any) => {
    if (!notification.read) {
        dispatch(markSingleNotificationRead(notification._id));
    }

    if (notification.type === "FOLLOW") {
        navigate(`/profile/${notification.sender?._id}`);
    }

    if (
        notification.type === "LIKE" ||
        notification.type === "COMMENT"
    ) {
        navigate(`/post/${notification.postId?._id}`);
    }
  };

  return (
    <>
      <TabsRow>
        <Tab
          $active={activeTab === "ALL"}
          onClick={() => setActiveTab("ALL")}
        >
          All
        </Tab>
        <Tab
          $active={activeTab === "LIKE"}
          onClick={() => setActiveTab("LIKE")}
        >
          Likes
        </Tab>
        <Tab
          $active={activeTab === "COMMENT"}
          onClick={() => setActiveTab("COMMENT")}
        >
          Comments
        </Tab>
        <Tab
          $active={activeTab === "FOLLOW"}
          onClick={() => setActiveTab("FOLLOW")}
        >
          Followers
        </Tab>
      </TabsRow>

      {filteredNotifications.length === 0 && (
        <EmptyState>No notifications yet.</EmptyState>
      )}

      {filteredNotifications.map((n) => (
        <NotificationCard
          key={n._id}
          $unread={!n.read}
          onClick={() => handleClick(n)}
        >
          <NotificationRow>
            <div>
              <Text>
                <Username>
                  {n.sender?.username}
                </Username>{" "}
                {n.type === "FOLLOW" &&
                  "started following you."}
                {n.type === "LIKE" &&
                  "liked your post."}
                {n.type === "COMMENT" &&
                  "commented on your post."}
              </Text>
              <Time>
                {new Date(n.createdAt).toLocaleString()}
              </Time>
            </div>

            {!n.read && <UnreadDot />}
          </NotificationRow>
        </NotificationCard>
      ))}
    </>
  );
};

export default NotificationList;
