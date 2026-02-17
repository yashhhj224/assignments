
import { CONFIG } from "../constants/config";

export const resolveImageUrl = (url: string): string => {
  if (!url) return "";

  if (url.startsWith("data:image/")) {
    return url;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("/")) {
    return `${CONFIG.BASE_URL}${url}`;
  }

  return `${CONFIG.BASE_URL}/${url}`;
};
