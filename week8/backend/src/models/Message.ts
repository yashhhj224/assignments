
import mongoose, { Schema, Document } from "mongoose";

export type MessageType = "TEXT" | "IMAGE" | "VIDEO";

export interface IMessage extends Document {
  conversationId: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;

  type: MessageType;

  content?: string;
  mediaUrl?: string;

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
    enum: ["TEXT", "IMAGE", "VIDEO"],
    default: "TEXT"
  },
  
  content:{
    type:String,
    trim:true
  },

  mediaUrl:{
    type:String
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

messageSchema.index({ conversationId: 1, createdAt: -1 });
messageSchema.index({ receiver: 1, seen: 1 });

export const Message = mongoose.model<IMessage>(
  "Message",
  messageSchema
);
