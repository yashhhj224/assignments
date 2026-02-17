
import mongoose from "mongoose";
import { ENV } from "./env";

export const connectDB = async (): Promise<void> => {
  if (!ENV.MONGO_URI.trim()) {
    throw new Error("MONGO_URI is missing");
  }

  await mongoose.connect(ENV.MONGO_URI);

  console.log("MongoDB connected!!");
};
