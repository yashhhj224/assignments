
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT ?? "5000",
  MONGO_URI: process.env.MONGO_URI ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "",
  JWT_EXPIRES_IN: (process.env.JWT_EXPIRES_IN ?? "7d") as jwt.SignOptions["expiresIn"]
} as const;
