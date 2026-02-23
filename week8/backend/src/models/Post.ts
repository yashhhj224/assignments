
import mongoose, { Document, Schema } from "mongoose";
import { VALIDATION_RULES } from "../constants/validation";

export interface IPost extends Document {
  author: mongoose.Types.ObjectId;
  title: string;
  content: string;
  images: string[];
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
    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (value: string[]) {
          if (!Array.isArray(value)) return false;

          return value.every((url) => {
            if (typeof url !== "string") return false;

            return (
              url.startsWith("/uploads/") &&
              (url.endsWith(".jpg") ||
                url.endsWith(".jpeg") ||
                url.endsWith(".png") ||
                url.endsWith(".webp"))
            );
          });
        },
        message: "Invalid image url format"
      }
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

export const Post = mongoose.model<IPost>("Post", postSchema);
