
import { Schema, model, Document, Types } from "mongoose";

export type NotificationType = "LIKE" | "COMMENT" | "FOLLOW";

export interface INotification extends Document {
    user: Types.ObjectId;
    sender?: Types.ObjectId;
    type: NotificationType;
    postId?: Types.ObjectId;
    read: boolean;
    createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        type: {
            type: String,
            required: true,
            enum: ["LIKE", "COMMENT", "FOLLOW"],
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: {createdAt: true, updatedAt: true } }
);

notificationSchema.index({ user: 1, read: 1, createdAt: -1 });

export const Notification = model<INotification>(
    "Notification",
    notificationSchema
);
