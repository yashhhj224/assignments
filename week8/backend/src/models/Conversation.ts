
import { Schema, model, Document, Types } from "mongoose";

export interface IConversation extends Document {
  participants: Types.ObjectId[]; 
  conversationKey: string;
  lastMessage?: string;
  lastMessageSender?: Types.ObjectId;
  lastMessageAt?: Date;

  unreadCounts: Map<string, number>;

  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    conversationKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    lastMessage: {
      type: String,
      trim: true,
    },
    lastMessageSender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    lastMessageAt: {
      type: Date,
    },
    unreadCounts: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  { timestamps: true }
);

conversationSchema.pre<IConversation>("validate", function () {
  if (this.participants.length !== 2) {
    throw new Error("Conversation must have exactly 2 participants");
  }
});

conversationSchema.index({ participants: 1 });

export const Conversation = model<IConversation>(
  "Conversation",
  conversationSchema
);