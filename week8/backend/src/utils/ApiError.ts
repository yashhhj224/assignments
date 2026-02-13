
import { HTTP_STATUS } from "../constants/httpStatus";

export class ApiError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = HTTP_STATUS.BAD_REQUEST) {
    super(message);
    this.statusCode = statusCode;
  }
}
