
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";
import type { ApiErrorResponse } from "../types/api";

export const parseApiErrorMessage = (error: unknown): string => {
  if (!error) {
    return MESSAGES.ERROR.SOMETHING_WENT_WRONG;
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return MESSAGES.ERROR.SOMETHING_WENT_WRONG;
};

export const parseFetchError = async (response: Response): Promise<string> => {
  try {
    const data = (await response.json()) as ApiErrorResponse;

    if (data?.message && typeof data.message === "string") {
      return data.message;
    }

    return MESSAGES.ERROR.SOMETHING_WENT_WRONG;
  } catch {
    if (response.status === HTTP_STATUS.UNAUTHORIZED) {
      return MESSAGES.ERROR.UNAUTHORIZED;
    }

    if (response.status === HTTP_STATUS.FORBIDDEN) {
      return MESSAGES.ERROR.FORBIDDEN;
    }

    return MESSAGES.ERROR.SOMETHING_WENT_WRONG;
  }
};
