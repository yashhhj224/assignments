
import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import {
  fetchNotifications,
  markAllNotificationsRead,
} from "../redux/slices/notificationSlice";
import NotificationList from "../components/notifications/NotificationList";

const NotificationsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 max-w-4xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">
          Notifications
        </h2>

        <button
          onClick={async () => {
            await dispatch(markAllNotificationsRead());
            dispatch(fetchNotifications());
          }}
          className="bg-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
        >
          Mark all as read
        </button>
      </div>

      <NotificationList />
    </div>
  );
};

export default NotificationsPage;