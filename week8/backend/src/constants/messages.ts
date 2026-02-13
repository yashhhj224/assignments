
export const MESSAGES = {
  AUTH: {
    REGISTER_SUCCESS: "User registered successfully",
    LOGIN_SUCCESS: "Login successful"
  },

  USER: {
    PROFILE_FETCH_SUCCESS: "Profile fetched successfully",
    PROFILE_UPDATE_SUCCESS: "Profile updated successfully",
    USERS_FETCH_SUCCESS: "Users fetched successfully",
    USER_FETCH_SUCCESS: "User fetched successfully"
  },

  FOLLOW: {
    FOLLOW_SUCCESS: "User followed successfully",
    UNFOLLOW_SUCCESS: "User unfollowed successfully",
    FOLLOWING_FETCH_SUCCESS: "Following list fetched successfully",
    FOLLOWERS_FETCH_SUCCESS: "Followers fetched successfully"
  },

  POST: {
    POST_CREATED: "Post created successfully",
    POST_UPDATED: "Post updated successfully",
    POST_DELETED: "Post deleted successfully",
    POST_FETCHED: "Post fetched successfully",
    FEED_FETCHED: "Feed fetched successfully",
    USER_POSTS_FETCHED: "User posts fetched successfully"
  },

  UPLOAD: {
    UPLOAD_SUCCESS: "Images uploaded successfully"
  },

  ROUTE: {
    NOT_FOUND: "Route not found"
  },

  ERROR: {
    INTERNAL_SERVER_ERROR: "Internal server error",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Access denied",
    REQUEST_BODY_REQUIRED: "Request body is required",

    USERNAME_CANNOT_BE_EMPTY: "Username cannot be empty",
    INVALID_EMAIL_FORMAT: "Invalid email format",
    EMAIL_REQUIRED: "Email is required",
    PASSWORD_REQUIRED: "Password is required",
    USERNAME_REQUIRED: "Username is required",

    EMAIL_ALREADY_REGISTERED: "Email already registered",
    USERNAME_ALREADY_TAKEN: "Username already taken",
    USER_NOT_REGISTERED: "User not registered",
    INCORRECT_PASSWORD: "Incorrect password",

    USER_NOT_FOUND: "User not found",
    INVALID_USER_ID: "Invalid user id",

    INVALID_POST_ID: "Invalid post id",
    POST_NOT_FOUND: "Post not found",

    TITLE_REQUIRED: "Title is required",
    CONTENT_REQUIRED: "Content is required",
    TITLE_TOO_SHORT: "Title is too short",
    CONTENT_TOO_SHORT: "Content is too short",
    TITLE_CANNOT_BE_EMPTY: "Title cannot be empty",
    CONTENT_CANNOT_BE_EMPTY: "Content cannot be empty",

    USERNAME_TOO_SHORT: "Username is too short",
    PASSWORD_TOO_SHORT: "Password is too short",

    YOU_CANNOT_FOLLOW_YOURSELF: "You cannot follow yourself",
    ALREADY_FOLLOWING: "You are already following this user",
    NOT_FOLLOWING: "You are not following this user",

    IMAGES_MUST_BE_ARRAY: "Images must be an array",
    ONLY_IMAGE_FILES_ALLOWED: "Only image files are allowed"
  }
} as const;
