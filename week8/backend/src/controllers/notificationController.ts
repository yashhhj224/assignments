
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import { HTTP_STATUS } from "../constants/httpStatus";
import { 
    getNotificationsService, 
    markAllNotificationsReadService,
    getUnreadNotificationCountService,
    markSingleNotificationReadService
} from "../services/notificationService";

export const getNotificationsController = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.userId as string;

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const notifications = await getNotificationsService(
            userId,
            page,
            limit
        );

        successResponse(
            res,
            HTTP_STATUS.OK,
            "Notifications fetched successfully",
            notifications
        );
    }
);

export const markAllNotificationsReadController = asyncHandler(
    async(req: Request, res: Response) => {
        const userId = req.userId as string;
        await markAllNotificationsReadService(userId);

        successResponse(
            res,
            HTTP_STATUS.OK,
            "All notifications marked as read"
        );
    }
);

export const getUnreadNotificationCountController = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.userId as string;
        const result = 
            await getUnreadNotificationCountService(userId);

        successResponse(
            res,
            HTTP_STATUS.OK,
            "Unread notification count fetched successfully",
            result
        );
    }
);   

export const markSingleNotificationReadController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;
    const { id } = req.params;

    const notification =
      await markSingleNotificationReadService(userId, id);

    successResponse(
      res,
      HTTP_STATUS.OK,
      "Notification marked as read",
      notification
    );
  }
);
