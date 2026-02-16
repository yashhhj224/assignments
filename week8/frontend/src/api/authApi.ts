
import { API_ROUTES } from "../constants/apiRoutes";
import type {
  AuthResponseData,
  LoginRequestBody,
  RegisterRequestBody
} from "../types/auth";
import { normalizeEmail, normalizeText } from "../utils/validators";
import { sendRequest } from "./apiClient";

export const registerUserApi = async (
  payload: RegisterRequestBody
): Promise<AuthResponseData> => {
  const safePayload: RegisterRequestBody = {
    username: normalizeText(payload.username),
    email: normalizeEmail(payload.email),
    password: normalizeText(payload.password),
    profilePic: payload.profilePic ? normalizeText(payload.profilePic) : ""
  };

  return sendRequest<AuthResponseData, RegisterRequestBody>({
    endpoint: API_ROUTES.AUTH.REGISTER,
    method: "POST",
    body: safePayload
  });
};

export const loginUserApi = async (
  payload: LoginRequestBody
): Promise<AuthResponseData> => {
  const safePayload: LoginRequestBody = {
    email: normalizeEmail(payload.email),
    password: normalizeText(payload.password)
  };

  return sendRequest<AuthResponseData, LoginRequestBody>({
    endpoint: API_ROUTES.AUTH.LOGIN,
    method: "POST",
    body: safePayload
  });
};
