
import { getIO } from "./index";
import { getUnreadNotificationCountService } from "../services/notificationService";

export const emitNotification = async (
  receiverId: string,
  notification: any
) => {
  const io = getIO();

  io.to(receiverId).emit("new_notification", notification);

  const unreadData =
    await getUnreadNotificationCountService(receiverId);

  io.to(receiverId).emit(
    "notification_unread_updated",
    unreadData
  );
};
