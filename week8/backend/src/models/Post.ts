
import mongoose, { Document, Schema } from "mongoose";
import { VALIDATION_RULES } from "../constants/validation";

export type PostMediaType = "IMAGE" | "VIDEO";

export interface IPost extends Document {
  author: mongoose.Types.ObjectId;
  title: string;
  content: string;

  media: {
    type: PostMediaType;
    url: string;
  }[];

  tags: string[];
  likesCount: number;
  commentsCount: number;

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
    tags: {
      type: [String],
      default: []
    },
    likesCount: {
      type: Number,
      default: 0
    },
    commentsCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

postSchema.index({ author: 1, createdAt: -1 });

export const Post = mongoose.model<IPost>("Post", postSchema);
