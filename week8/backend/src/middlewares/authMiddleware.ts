
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";
import { verifyToken } from "../utils/jwt";
import { errorResponse } from "../utils/response";
import { MESSAGES } from "../constants/messages";

export const authMiddleware = (
  req: Request,     
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    errorResponse(res, HTTP_STATUS.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED);
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    errorResponse(res, HTTP_STATUS.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED);
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch {
    errorResponse(res, HTTP_STATUS.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED);
  }
};
