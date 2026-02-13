
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { ENV } from "../config/env";

export const generateToken = (userId: string): string => {
  if (!ENV.JWT_SECRET.trim()) {
    throw new Error("JWT_SECRET is missing");
  }

  const secretKey: Secret = ENV.JWT_SECRET;

  const options: SignOptions = {
    expiresIn: ENV.JWT_EXPIRES_IN
  };
  
  return jwt.sign({ userId }, secretKey, options);
};

export const verifyToken = (token: string): { userId: string } => {
  if (!ENV.JWT_SECRET.trim()) {
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.verify(token, ENV.JWT_SECRET) as { userId: string };
};
