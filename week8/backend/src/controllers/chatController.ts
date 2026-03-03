
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import { HTTP_STATUS } from "../constants/httpStatus";
import { 
    createOrGetConversationService,
    sendMessageService,
    getUserConversationsService,
    getMessagesByConversationService,
    markConversationAsSeenService,
    getUnreadConversationCountService,
} from "../services/chatService";
import { getIO } from "../socket";
import { Conversation } from "../models/Conversation";

export const createOrGetConversationController = asyncHandler(
    async (req: Request, res: Response) => {
        const currentUserId = req.userId as string;
        const { targetUserId } = req.body;

        const conversation = await createOrGetConversationService(
            currentUserId,
            targetUserId
        );

        successResponse(
            res,
            HTTP_STATUS.OK,
            "Conversation fetched successfully",
            conversation
        );
    }
);

export const sendMessageController = asyncHandler(
    async (req: Request, res: Response) => {
        const currentUserId = req.userId as string;
        const { conversationId, content } = req.body;

        const { canSendMessage } = await import("../socket");

        if (!canSendMessage(currentUserId)) {
            return res.status(429).json({
                success: false,
                message: "Too many messages. Please slow down."
            });
        }

        const message = await sendMessageService(
            currentUserId,
            conversationId,
            content
        );

        const io = getIO();

        const receiverId = (message.receiver as any)._id.toString();

        const { isUserOnline } = await import("../socket");

        if (isUserOnline(receiverId)) {
            message.delivered = true;
            await message.save();
        }

        io.to(receiverId).emit("new_message", message);

        io.to(receiverId).emit("conversation_updated", {
            conversationId,
        });

        io.to(currentUserId).emit("conversation_updated", {
            conversationId,
        });

        const unreadData = 
            await getUnreadConversationCountService(receiverId);

        io.to(receiverId).emit(
            "unread_count_updated",
            unreadData
        );

        successResponse(
            res,
            HTTP_STATUS.CREATED,
            "Message sent successfully",
            message
        );
    }
);

export const getUserConversationsController = asyncHandler(
    async(req: Request, res: Response) => {
        const currentUserId = req.userId as string;

        const conversations = await getUserConversationsService(currentUserId);

        successResponse(
            res, 
            200, 
            "Conversations fetched", 
            conversations
        );
    }
);

export const getMessagesController = asyncHandler(
    async(req: Request, res: Response) => {
        const currentUserId = req.userId as string;
        const { conversationId } = req.params;

        const limit = Number(req.query.limit) || 20;

        const messages = await getMessagesByConversationService(
            currentUserId,
            conversationId,
            limit
        );

        successResponse(
            res,
            HTTP_STATUS.OK,
            "Messages fetched successfully",
            messages
        );
    }
);

export const markConversationAsSeenController = asyncHandler(
    async (req: Request, res: Response) => {
        const currentUserId = req.userId as string;
        const { conversationId } = req.params;

        await markConversationAsSeenService(
            currentUserId,
            conversationId
        );

        const io = getIO();

        const unreadData = 
            await getUnreadConversationCountService(currentUserId);

        io.to(currentUserId).emit(
            "unread_count_updated",
            unreadData
        );

        successResponse(
            res,
            HTTP_STATUS.OK,
            "Conversation marked as seen"
        );
    }
);

export const getUnreadConversationCountController = asyncHandler(
    async (req: Request, res: Response) => {
        const currentUserId = req.userId as string;

        const result = await getUnreadConversationCountService(
            currentUserId
        );

        successResponse(
            res,
            HTTP_STATUS.OK,
            "Unread conversation count fetched successfully",
            result
        );
    }
);
