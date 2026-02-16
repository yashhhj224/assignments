
export type ApiSuccessResponse<T> = {
  success: true;
  statusCode: number;
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  statusCode: number;
  message: string;
  errors?: any[];
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
