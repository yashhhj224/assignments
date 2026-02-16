
export const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === "string" && value.trim().length > 0;
};

export const normalizeText = (value: string): string => {
  return value.trim();
};

export const normalizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.trim().length >= 6;
};

export const isValidUsername = (username: string): boolean => {
  return username.trim().length >= 3;
};

export const normalizeTags = (tags: unknown): string[] => {
  if (!Array.isArray(tags)) return [];

  return tags
    .filter((tag) => typeof tag === "string")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
};
