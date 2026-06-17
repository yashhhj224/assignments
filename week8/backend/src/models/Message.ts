
import mongoose, { Schema, Document } from "mongoose";

export type MessageType = "TEXT" | "MEDIA";

export interface IMessage extends Document {
  conversationId: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  receiver?: mongoose.Types.ObjectId;

  type: MessageType;

  content?: string;

  media: {
    type: "IMAGE" | "VIDEO";
    url: string;
  }[];

  delivered: boolean;
  seen: boolean;
  isDeleted: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
{
  conversationId:{
    type: Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
    index: true
  },

  sender:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  receiver:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false
  },

  type: {
    type: String,
    enum: ["TEXT", "MEDIA"],
    default: "TEXT"
  },

  content: {
    type: String,
    trim: true
  },

  media: {
    type: [
      {
        type: {
          type: String,
          enum: ["IMAGE", "VIDEO"],
          required: true
        },
        url: {
          type: String,
          required: true
        }
      }
    ],
    default: []
  },

  delivered:{
    type:Boolean,
    default:false
  },

  seen:{
    type:Boolean,
    default:false
  },

  isDeleted:{
    type:Boolean,
    default:false
  }

},
{timestamps:true}
);

messageSchema.pre<IMessage>("validate", function () {
  if (
    (!this.content || this.content.trim().length === 0) &&
    (!this.media || this.media.length === 0)
  ) {
    throw new Error("Message must have text or media");
  }
});

messageSchema.index({ conversationId: 1, createdAt: -1 });
messageSchema.index({ receiver: 1, seen: 1 });
messageSchema.index({ sender: 1 });

export const Message = mongoose.model<IMessage>(
  "Message",
  messageSchema
);
