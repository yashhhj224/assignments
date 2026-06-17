
import { VALIDATION_RULES } from "../constants/validation";

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH;
};

export const isValidUsername = (username: string): boolean => {
  return username.length >= VALIDATION_RULES.USERNAME_MIN_LENGTH;
};

export const isValidMongoId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

export const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === "string" && value.trim().length > 0;
};

export const normalizeText = (text: string): string => {
  return text.trim();
};

export const normalizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

export const normalizeTags = (tags: unknown): string[] => {
  if (!Array.isArray(tags)) return [];

  return tags
    .filter((tag) => typeof tag === "string")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
};
