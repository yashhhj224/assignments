
import mongoose, { Document, Schema } from "mongoose";
import { VALIDATION_RULES } from "../constants/validation";

export interface IPost extends Document {
  author: mongoose.Types.ObjectId;
  title: string;
  content: string;
  images: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true,
      minlength: VALIDATION_RULES.POST_TITLE_MIN_LENGTH,
      trim: true
    },
    content: {
      type: String,
      required: true,
      minlength: VALIDATION_RULES.POST_CONTENT_MIN_LENGTH,
      trim: true
    },
    images: {
      type: [String],
      default: []
    },
    tags: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

export const Post = mongoose.model<IPost>("Post", postSchema);
