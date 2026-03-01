
import { HTTP_STATUS } from "../constants/httpStatus";
import { Notification, NotificationType } from "../models/Notification";
import { Types } from "mongoose";
import { ApiError } from "../utils/ApiError";

export const createNotificationService = async(
    receiverId: string,
    senderId: string,
    type: NotificationType,
    postId?: string
) => {
    if (receiverId === senderId) return;

    const notification = await Notification.create({
        user: new Types.ObjectId(receiverId),
        sender: new Types.ObjectId(senderId),
        type,
        postId: postId ? new Types.ObjectId(postId) : undefined,
    });

    return notification.populate("sender", "-password");
};

export const getNotificationsService = async (
    userId: String,
    page: number = 1,
    limit: number = 20
) => {
    const safeLimit = limit < 1 ? 20 : limit > 50 ? 50 : limit;

    const notifications = await Notification.find({
        user: userId,
    })
      .populate("sender", "-password")
      .populate("postId")
      .sort({ createdAt: -1})
      .limit(safeLimit);

    return notifications;
};

export const markAllNotificationsReadService = async(
    userId: string
) => {
    await Notification.updateMany(
        { user: userId, read: false },
        { $set: { read: true } }
    );

    return true;
};

export const getUnreadNotificationCountService = async (
    userId: string
) => {
    const count = await Notification.countDocuments({
        user: userId,
        read: false,
    });

    return { getUnreadNotificationCount: count };
};

export const markSingleNotificationReadService = async (
  userId: string,
  notificationId: string
) => {
  const notification = await Notification.findOne({
    _id: notificationId,
    user: userId,
  });

  if (!notification) {
    throw new ApiError(
      "Notification not found",
      HTTP_STATUS.NOT_FOUND
    );
  }

  if (!notification.read) {
    notification.read = true;
    await notification.save();
  }

  return notification;
};
