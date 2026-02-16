
export const API_ROUTES = {
  AUTH: {
    REGISTER: "/api/register",
    LOGIN: "/api/login"
  },

  USER: {
    PROFILE: "/api/profile",
    USERS: "/api/users",
    USER_BY_ID: (id: string) => `/api/users/${id}`
  },

  FOLLOW: {
    FOLLOW_USER: (userId: string) => `/api/follow/${userId}`,
    UNFOLLOW_USER: (userId: string) => `/api/follow/${userId}`,
    FOLLOWING: "/api/following",
    FOLLOWERS: (userId: string) => `/api/followers/${userId}`
  },

  POSTS: {
    FEED: "/api/posts/feed",
    CREATE: "/api/posts",
    UPDATE: (postId: string) => `/api/posts/${postId}`,
    DELETE: (postId: string) => `/api/posts/${postId}`,
    POST_BY_ID: (postId: string) => `/api/posts/${postId}`,
    POSTS_BY_USER: (userId: string) => `/api/posts/user/${userId}`
  },

  UPLOADS: {
    UPLOAD_IMAGES: "/api/uploads"
  }
} as const;
