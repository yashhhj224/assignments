
import mongoose, { Document, Schema } from "mongoose";
import { VALIDATION_RULES } from "../constants/validation";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePic: string;
  following: mongoose.Types.ObjectId[];
  followers: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: VALIDATION_RULES.USERNAME_MIN_LENGTH,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: VALIDATION_RULES.PASSWORD_MIN_LENGTH
    },
    profilePic: {
      type: String,
      default: ""
    },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: []
      }
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: []
      }
    ]
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
