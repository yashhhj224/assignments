
import { Response } from "express";

export const successResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data: data ?? null
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  errors: any[] = []
) => {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors
  });
};
