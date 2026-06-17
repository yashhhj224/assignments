
import mongoose, { Document, Schema } from "mongoose";

export interface ILike extends Document {
  post: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const likeSchema = new Schema<ILike>(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  }
);

likeSchema.index({ post: 1, user: 1 }, { unique: true });

export const Like = mongoose.model<ILike>("Like", likeSchema);
