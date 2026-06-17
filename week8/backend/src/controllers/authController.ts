
import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";
import { loginUserService, registerUserService } from "../services/authService";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await registerUserService(req.body);

    successResponse(res, HTTP_STATUS.CREATED, MESSAGES.AUTH.REGISTER_SUCCESS, result);
  }
);

export const loginUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await loginUserService(req.body);

    successResponse(res, HTTP_STATUS.OK, MESSAGES.AUTH.LOGIN_SUCCESS, result);
  }
);
