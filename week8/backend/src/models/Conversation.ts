

import { Schema, model, Document, Types } from "mongoose";

export type ConversationType = "DIRECT" | "GROUP";

export interface IConversation extends Document {
  participants: Types.ObjectId[];
  
  type: ConversationType;

  groupName?: string;
  groupAdmin?: Types.ObjectId;
  groupAvatar?: string;

  conversationKey?: string;

  lastMessage?: string;
  lastMessageSender?: Types.ObjectId;
  lastMessageAt?: Date;

  unreadBy: Types.ObjectId[];

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

    type: {
      type: String,
      enum: ["DIRECT", "GROUP"],
      default: "DIRECT"
    },

    groupName: {
      type: String,
      trim: true
    },

    groupAvatar: {
      type: String,
      default: "",
    },

    groupAdmin: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    conversationKey: {
      type: String,
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
    unreadBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      }
    ],
  },
  { timestamps: true }
);

conversationSchema.pre<IConversation>("validate", function () {

  if (this.type === "DIRECT") {
    if (!this.participants || this.participants.length !== 2) {
      throw new Error("Direct conversation must have exactly 2 participants");
    }
  }

  if (this.type === "GROUP") {
    if (!this.groupName) {
      throw new Error("Group must have name");
    }

    if (!this.groupAdmin) {
      throw new Error("Group must have admin");
    }
  }

});

conversationSchema.index({ participants: 1, lastMessageAt: -1 });

conversationSchema.index(
  { conversationKey: 1 },
  {
    unique: true,
    partialFilterExpression: {
      conversationKey: { $type: "string" }
    }
  }
);

export const Conversation = model<IConversation>(
  "Conversation",
  conversationSchema
);
