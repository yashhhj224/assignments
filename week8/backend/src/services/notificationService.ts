
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
  userId: string,
  page: number = 1,
  limit: number = 20
) => {
  const safeLimit = limit < 1 ? 20 : limit > 50 ? 50 : limit;
  const safePage = page < 1 ? 1 : page;

  const skip = (safePage - 1) * safeLimit;

  const [notifications, total] = await Promise.all([
    Notification.find({ user: userId })
      .populate("sender", "-password")
      .populate("postId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(safeLimit),

    Notification.countDocuments({ user: userId })
  ]);

  return {
    notifications,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      hasMore: skip + notifications.length < total
    }
  };
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

  return { unreadNotificationCount: count };
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
