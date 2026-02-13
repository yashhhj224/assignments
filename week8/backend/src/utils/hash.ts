
import bcrypt from "bcryptjs";
import { SECURITY_CONSTANTS } from "../constants/security";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SECURITY_CONSTANTS.BCRYPT_SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
