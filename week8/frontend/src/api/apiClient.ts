
import type { ApiResponse } from "../types/api";
import { getAuthToken, clearAuthStorage } from "../utils/storage";

const BASE_URL = "http://localhost:5000";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export class ApiError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

type RequestOptions<TBody> = {
  endpoint: string;
  method: HttpMethod;
  body?: TBody;
  isFormData?: boolean;
};

const createTimeoutSignal = (timeoutMs: number): AbortSignal => {
  const controller = new AbortController();

  setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  return controller.signal;
};

export const sendRequest = async <TResponse, TBody = unknown>(
  options: RequestOptions<TBody>
): Promise<TResponse> => {
  const token = getAuthToken();

  const headers: HeadersInit = {};

  if (!options.isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method: options.method,
    headers,
    signal: createTimeoutSignal(15000)
  };

  if (options.body !== undefined) {
    config.body = options.isFormData
      ? (options.body as any)
      : JSON.stringify(options.body);
  }

  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${options.endpoint}`, config);
  } catch {
    throw new ApiError("Network error. Please try again.", 500);
  }

  let result: ApiResponse<TResponse>;

  try {
    result = (await response.json()) as ApiResponse<TResponse>;
  } catch {
    throw new ApiError("Invalid server response", response.status);
  }

  if (response.status === 401) {
    clearAuthStorage();
  }

  if (!response.ok || !result.success) {
    throw new ApiError(
      result.message || "Something went wrong",
      result.statusCode || response.status
    );
  }

  return result.data;
};
