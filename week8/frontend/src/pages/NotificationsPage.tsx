
import styled from "styled-components";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import {
  fetchNotifications,
  markAllNotificationsRead,
} from "../redux/slices/notificationSlice";
import NotificationList from "../components/notifications/NotificationList";

const Wrapper = styled.div`
  background: white;
  border-radius: 22px;
  padding: 32px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.06);
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
`;

const MarkReadBtn = styled.button`
  background: #4338ca;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    opacity: 0.9;
  }
`;

const NotificationsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <Wrapper>
      <HeaderRow>
        <Title>Notifications</Title>
        <MarkReadBtn
            onClick={async () => {
                await dispatch(markAllNotificationsRead());
                dispatch(fetchNotifications());
            }}
        >
          Mark all as read
        </MarkReadBtn>
      </HeaderRow>

      <NotificationList />
    </Wrapper>
  );
};

export default NotificationsPage;
