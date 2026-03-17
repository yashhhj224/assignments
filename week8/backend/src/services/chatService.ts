

import mongoose from "mongoose";
import { Conversation } from "../models/Conversation";
import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";
import { HTTP_STATUS } from "../constants/httpStatus";
import { isValidMongoId } from "../utils/validators";
import { MESSAGES } from "../constants/messages";
import { Message } from "../models/Message";
import { isNonEmptyString, normalizeText } from "../utils/validators";
import { getIO, isUserOnline, canSendMessage } from "../socket/index";

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
        unreadBy: []
    });

    const populatedConversation = await Conversation.findById(
        conversation._id
    ).populate("participants", "-password");

    return populatedConversation;
};

export const sendMessageService = async (
    currentUserId:string,
    conversationId:string,
    content?:string,
    file?: Express.Multer.File
) => {

    if (!canSendMessage(currentUserId)) {
        throw new ApiError(
            "Too many messages. Please slow down.",
            HTTP_STATUS.BAD_REQUEST
        );
    }
    if (!isValidMongoId(conversationId)) {
        throw new ApiError(
            "Invalid conversation id",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    if (content && !isNonEmptyString(content)) {
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

    let receiverId: mongoose.Types.ObjectId | undefined;

    if (conversation.type === "DIRECT") {
    receiverId = conversation.participants.find(
        (p) => p.toString() !== currentUserId
    );

    if (!receiverId) {
        throw new ApiError(
        "Invalid conversation participants",
        HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }
    }

    const normalizedContent = content ? normalizeText(content) : "";

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

    let messageType: "TEXT" | "IMAGE" | "VIDEO" = "TEXT";
    let mediaUrl: string | undefined;

    if (file) {
        const mime = file.mimetype;

        if (mime.startsWith("image/")) {
            messageType = "IMAGE";
        } else if (mime.startsWith("video/")) {
            messageType = "VIDEO";
        } else {
            throw new ApiError(
            "Unsupported media type",
            HTTP_STATUS.BAD_REQUEST
            );
        }

        mediaUrl = `/uploads/${file.filename}`;
    }
    
    const message = await Message.create({
        conversationId: conversation._id,
        sender: currentUserId,
        receiver: receiverId
            ? new mongoose.Types.ObjectId(receiverId)
            : undefined,
        type: messageType,
        content: normalizedContent || "",
        mediaUrl
    });

    if (messageType === "TEXT") {
    conversation.lastMessage = normalizedContent;
    }

    if (messageType === "IMAGE") {
    conversation.lastMessage = "Image";
    }

    if (messageType === "VIDEO") {
    conversation.lastMessage = "Video";
    }
    conversation.lastMessageSender = new mongoose.Types.ObjectId(
        currentUserId
    );
    conversation.lastMessageAt = new Date();

    conversation.unreadBy = conversation.unreadBy.filter(
        (id) => id.toString() !== currentUserId
    );

    if (conversation.type === "DIRECT" && receiverId) {

    const alreadyUnread = conversation.unreadBy.some(
        (id) => id.toString() === receiverId!.toString()
    );

    if (!alreadyUnread) {
        conversation.unreadBy.push(receiverId);
    }

    }

    if (conversation.type === "GROUP") {

    conversation.participants.forEach((userId) => {

        const uid = userId.toString();

        if (uid !== currentUserId) {

        const alreadyUnread = conversation.unreadBy.some(
            (id) => id.toString() === uid
        );

        if (!alreadyUnread) {
            conversation.unreadBy.push(userId);
        }

        }

    });

    }

    await conversation.save();

    const populatedMessage = await Message.findById(message._id)
        .populate("sender", "-password")
        .populate("receiver", "-password")
        .orFail();

    const io = getIO();

    const receiverIdString = receiverId!.toString();

    if (isUserOnline(receiverIdString)) {
        await Message.findByIdAndUpdate(message._id, {
            delivered: true
        });
    }

    if (conversation.type === "DIRECT") {

    const receiverIdString = receiverId!.toString();

    io.to(receiverIdString).emit(
        "new_message",
        populatedMessage
    );

    }

    if (conversation.type === "GROUP") {

        conversation.participants.forEach((userId) => {

            const uid = userId.toString();

            if (uid !== currentUserId) {
            io.to(uid).emit(
                "new_message",
                populatedMessage
            );
            }

        });

    }

    io.to(receiverIdString).emit("conversation_updated", {
        conversationId: conversation._id,
    });

    io.to(currentUserId).emit("conversation_updated", {
    conversationId: conversation._id,
    });

    if (conversation.type === "DIRECT" && receiverId) {

    const receiverIdString = receiverId.toString();

    const unreadData = await getUnreadConversationCountService(
        receiverIdString
    );

    io.to(receiverIdString).emit(
        "unread_count_updated",
        unreadData
    );

    }

    if (conversation.type === "GROUP") {

    for (const userId of conversation.participants) {

        const uid = userId.toString();

        if (uid !== currentUserId) {

        const unreadData =
            await getUnreadConversationCountService(uid);

        io.to(uid).emit(
            "unread_count_updated",
            unreadData
        );

        }

    }

    }

    return populatedMessage;
};

export const getUserConversationsService = async (
  currentUserId: string
) => {
  const conversations = await Conversation.find({
    participants: currentUserId,
  })
    .populate("participants", "-password")
    .sort({ lastMessageAt: -1 });

  return conversations;
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

    conversation.unreadBy = conversation.unreadBy.filter(
        (id) => id.toString() !== currentUserId
    );

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
    }).select("unreadBy");

    let unreadConversationCount = 0;

    for (const conversation of conversations) {
        const hasUnread = conversation.unreadBy.some(
            (id) => id.toString() === currentUserId
        );

        if (hasUnread) {
            unreadConversationCount++; 
        }
    }

    return {
        unreadConversationCount,
    };
};
