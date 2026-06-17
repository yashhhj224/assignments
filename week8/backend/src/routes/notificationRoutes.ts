
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  getNotificationsController,
  markAllNotificationsReadController,
  getUnreadNotificationCountController,
  markSingleNotificationReadController,
} from "../controllers/notificationController";

const router = Router();

router.get(
    "/notifications", 
    authMiddleware,
    getNotificationsController
);

router.put(
    "/notifications/read-all",
    authMiddleware,
    markAllNotificationsReadController
);

router.get(
    "/notifications/unread-count",
    authMiddleware,
    getUnreadNotificationCountController
);

router.put(
  "/notifications/:id/read",
  authMiddleware,
  markSingleNotificationReadController
);

export default router;
