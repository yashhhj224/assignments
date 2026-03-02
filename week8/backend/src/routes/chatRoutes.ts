
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createOrGetConversationController,
  sendMessageController,
  getUserConversationsController,
  getMessagesController,
  markConversationAsSeenController,
  getUnreadConversationCountController,
} from "../controllers/chatController";

const router = Router();

router.post(
    "/chat/conversations",
    authMiddleware,
    createOrGetConversationController
);

router.get(
    "/chat/conversations",
    authMiddleware,
    getUserConversationsController
);

router.get(
    "/chat/unread-count",
    authMiddleware,
    getUnreadConversationCountController
);

router.post(
    "/chat/messages",
    authMiddleware,
    sendMessageController
);

router.get(
    "/chat/conversations/:conversationId/messages",
    authMiddleware,
    getMessagesController
);

router.put(
    "/chat/conversations/:conversationId/seen",
    authMiddleware,
    markConversationAsSeenController
);

export default router;
