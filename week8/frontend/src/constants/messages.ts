
export const MESSAGES = {
  ERROR: {
    SOMETHING_WENT_WRONG: "Something went wrong",
    NETWORK_ERROR: "Network error. Please try again.",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Access denied",
    INVALID_EMAIL: "Invalid email format",
    PASSWORD_TOO_SHORT: "Password is too short",
    USERNAME_TOO_SHORT: "Username is too short",
    REQUIRED_FIELDS_MISSING: "Required fields are missing",
    INVALID_RESPONSE: "Invalid server response"
  },

  SUCCESS: {
    LOGIN_SUCCESS: "Login successful",
    REGISTER_SUCCESS: "User registered successfully",
    PROFILE_UPDATED: "Profile updated successfully",
    POST_CREATED: "Post created successfully",
    POST_UPDATED: "Post updated successfully",
    POST_DELETED: "Post deleted successfully"
  }
} as const;
