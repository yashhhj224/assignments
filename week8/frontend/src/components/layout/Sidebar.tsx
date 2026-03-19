
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { FiHome, FiUsers, FiUser, FiPlusSquare, FiBell, FiMessageCircle } from "react-icons/fi";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { fetchUnreadNotificationCount } from "../../redux/slices/notificationSlice";

const Wrapper = styled.div`
  height: calc(100vh - 70px);
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
  }

  &.active {
    background: #ede9fe;
    color: #4338ca;
    font-weight: 600;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #e5e7eb;
  margin: 20px 0;
`;

const NewPostBtn = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px;
  border-radius: 14px;
  background: linear-gradient(135deg, #4338ca, #6366f1);
  color: white;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 6px 14px rgba(67, 56, 202, 0.2);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(67, 56, 202, 0.25);
  }
`;

const NotificationCount = styled.span`
  margin-left: auto;
  background: #ef4444;
  color: white;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 12px;
  font-weight: 600;
`;

const Sidebar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { conversations, messages, currentUserId } = useAppSelector(
    (state) => state.chat
  );

  const unreadConversationCount = conversations.filter(
    (conv) =>
      currentUserId &&
      conv.unreadBy?.includes(currentUserId)
  ).length;

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUnreadNotificationCount());
    }
  }, [user?._id, dispatch]);

  const unreadCount = useAppSelector(
    (state) => state.notifications.unreadCount
  );
  return (
    <Wrapper>
      <Section>
        <MenuItem to="/home">
          <FiHome />
          Home
        </MenuItem>

        <MenuItem to="/users">
          <FiUsers />
          Users
        </MenuItem>

        {user?._id && (
          <MenuItem to={`/profile/${user._id}`}>
            <FiUser />
            Profile
          </MenuItem>
        )}

        <MenuItem to="/chat">
          <FiMessageCircle />
          Messages
          {unreadConversationCount > 0 && (
            <NotificationCount>
              {unreadConversationCount}
            </NotificationCount>
          )}
        </MenuItem>

        <MenuItem to="/notifications">
          <FiBell />
          Notifications
          {unreadCount > 0 && (
            <NotificationCount>
              {unreadCount}
            </NotificationCount>
          )}
        </MenuItem>
        <Divider />
      </Section>

      <NewPostBtn to="/create-post">
        <FiPlusSquare />
        New Post
      </NewPostBtn>
    </Wrapper>
  );
};

export default Sidebar;
