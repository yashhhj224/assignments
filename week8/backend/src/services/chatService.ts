
import mongoose from "mongoose";
import { Conversation } from "../models/Conversation";
import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";
import { HTTP_STATUS } from "../constants/httpStatus";
import { isValidMongoId } from "../utils/validators";
import { MESSAGES } from "../constants/messages";
import { Message } from "../models/Message";
import { isNonEmptyString, normalizeText } from "../utils/validators";

const generateConversationKey = (
    userId1: string,
    userId2: string
): string => {
    const sortedIds = [userId1, userId2].sort();
    return `${sortedIds[0]}_${sortedIds[1]}`;
};

export const createOrGetConversationService = async (
    currentUserId: string,
    targetUserId: string
) => {
    if (!isValidMongoId(targetUserId)) {
        throw new ApiError(
            MESSAGES.ERROR.INVALID_USER_ID,
            HTTP_STATUS.BAD_REQUEST
        );
    }

    if (currentUserId === targetUserId) {
        throw new ApiError(
            MESSAGES.ERROR.FORBIDDEN,
            HTTP_STATUS.BAD_REQUEST
        );
    }

    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
        throw new ApiError(
            MESSAGES.ERROR.USER_NOT_FOUND,
            HTTP_STATUS.NOT_FOUND
        );
    }

    const conversationKey = generateConversationKey(
        currentUserId,
        targetUserId
    );

    let conversation = await Conversation.findOne({ conversationKey })
        .populate("participants", "-password");

    if (conversation) {
        return conversation;
    }

    conversation = await Conversation.create({
        participants: [
            new mongoose.Types.ObjectId(currentUserId),
            new mongoose.Types.ObjectId(targetUserId)
        ],
        conversationKey,
        unreadCounts: {
            [currentUserId]: 0,
            [targetUserId]: 0
        }
    });

    const populatedConversation = await Conversation.findById(
        conversation._id
    ).populate("participants", "-password");

    return populatedConversation;
};

export const sendMessageService = async(
    currentUserId: string,
    conversationId: string,
    content: string
) => {
    if (!isValidMongoId(conversationId)) {
        throw new ApiError(
            "Invalid conversation id",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    if (!isNonEmptyString(content)) {
        throw new ApiError(
            "Message content cannot be empty",
            HTTP_STATUS.BAD_REQUEST
        );
    } 

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
        throw new ApiError(
            "Conversation not found",
            HTTP_STATUS.NOT_FOUND
        );
    }

    const isParticipant = conversation.participants.some(
        (participantId) => participantId.toString() === currentUserId
    );

    if (!isParticipant) {
        throw new ApiError(
            MESSAGES.ERROR.FORBIDDEN,
            HTTP_STATUS.FORBIDDEN
        );
    }

    const receiverId = conversation.participants.find(
        (participantId) => participantId.toString() !== currentUserId
    );

    if (!receiverId) {
        throw new ApiError(
            "Invalid conversation participants",
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }

    const normalizedContent = normalizeText(content);

    const MAX_MESSAGE_LENGTH = 2000;

    if (normalizedContent.length > MAX_MESSAGE_LENGTH) {
        throw new ApiError(
            "Message exceeds maximum allowed length",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    if (normalizedContent.includes("data:image/")) {
        throw new ApiError(
            "Only plain text messages are allowed",
            HTTP_STATUS.BAD_REQUEST
        )
    }
    const message = await Message.create({
        conversationId: conversation._id,
        sender: currentUserId,
        receiver: receiverId,
        content: normalizedContent
    });

    conversation.lastMessage = normalizedContent;
    conversation.lastMessageSender = new mongoose.Types.ObjectId(
        currentUserId
    );
    conversation.lastMessageAt = new Date();

    const receiverUnreadCount = 
        conversation.unreadCounts.get(receiverId.toString()) || 0;

    conversation.unreadCounts.set(
        receiverId.toString(),
        receiverUnreadCount + 1
    );

    await conversation.save;

    const populatedMessage = await Message.findById(message._id)
        .populate("sender", "-passwrd")
        .populate("receiver", "-password")
        .orFail();

    return populatedMessage;
};

export const getUserConversationsService = async(
    currentUserId: string 
) => {
    const conversations = await Conversation.find({
        participants: currentUserId,
    })
      .populate("participants", "-password")
      .sort({ lastMessageAt: -1});

    const formattedConversations = conversations.map((conversation) => {
        const otherParticipant = conversation.participants.find(
            (participant: any) => 
                participant._id.toString() !== currentUserId
        );

        const unreadCount = conversation.unreadCounts.get(currentUserId) || 0;

        return {
            id: conversation._id,
            chatUser: otherParticipant,
            lastMessage: conversation.lastMessage || "",
            lastMessageSender: conversation.lastMessageSender,
            lastMessageAt: conversation.lastMessageAt,
            unreadCount,
            hasUnread: unreadCount > 0,
        };
    });

    return formattedConversations;
};

export const getMessagesByConversationService = async(
    currentUserId: string,
    conversationId: string,
    limit: number = 20
) => {
    if (!isValidMongoId(conversationId)) {
        throw new ApiError(
            "Invalid conversation id",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
        throw new ApiError(
            "Conversation not found",
            HTTP_STATUS.NOT_FOUND
        );
    }

    const isParticipant = conversation.participants.some(
        (participantId) => participantId.toString() === currentUserId
    );

    if (!isParticipant) {
        throw new ApiError(
            MESSAGES.ERROR.FORBIDDEN,
            HTTP_STATUS.FORBIDDEN
        );
    }

    const safeLimit = limit < 1 ? 20 : limit > 100 ? 100 : limit;

    const messages = await Message.find({
        conversationId: conversation._id,
        isDeleted: false,
    })
      .populate("sender", "-password")
      .populate("receiver", "-password")
      .sort({ createdAt: -1})
      .limit(safeLimit);

    return {
        conversationId,
        limit: safeLimit,
        messages: messages.reverse(),
    };
};

export const markConversationAsSeenService = async (
    currentUserId: string,
    conversationId: string
) => {
    if (!isValidMongoId(conversationId)) {
        throw new ApiError(
            "Invalid conversation id",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
        throw new ApiError(
            "Conversation not found",
            HTTP_STATUS.NOT_FOUND
        );
    }

    const isParticipant = conversation.participants.some(
        (participantId) => participantId.toString() === currentUserId
    );

    if (!isParticipant) {
        throw new ApiError(
            MESSAGES.ERROR.FORBIDDEN,
            HTTP_STATUS.FORBIDDEN
        );
    }

    conversation.unreadCounts.set(currentUserId, 0);
    await conversation.save();

    await Message.updateMany(
        {
            conversationId: conversation._id,
            receiver: currentUserId,
            seen: false,
        },
        { $set: {seen: true } }
    );

    return {
        success: true,
    };
};

export const getUnreadConversationCountService = async (
    currentUserId: string
) => {
    const conversations = await Conversation.find({
        participants: currentUserId,
    }).select("unreadCounts");

    let unreadConversationCount = 0;

    for (const conversation of conversations) {
        const unreadCount = conversation.unreadCounts.get(currentUserId) || 0;

        if (unreadCount > 0) {
            unreadConversationCount++;
        }
    }

    return {
        unreadConversationCount,
    };
};
