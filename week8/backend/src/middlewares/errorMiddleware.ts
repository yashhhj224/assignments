
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";
import { ApiError } from "../utils/ApiError";
import { errorResponse } from "../utils/response";
import { MESSAGES } from "../constants/messages";

export const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof ApiError) {
    errorResponse(res, error.statusCode, error.message);
    return;
  }

  if (error instanceof Error) {
    errorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);
    return;
  }

  errorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
};
