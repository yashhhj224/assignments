
const BASE_URL = "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`
  };
};

export const fetchFeedApi = async (page: number = 1) => {
  const response = await fetch(
    `${BASE_URL}/posts/feed?page=${page}&limit=10`,
    {
      headers: getAuthHeaders()
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch feed");
  }

  return data.data;
};

export const fetchPostByIdApi = async (postId: string) => {
  const response = await fetch(
    `${BASE_URL}/posts/${postId}`,
    {
      headers: getAuthHeaders()
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch post");
  }

  return data.data;
};

export const createPostApi = async (payload: {
  title: string;
  content: string;
  tags: string[];
  images: string[];
}) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders()
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create post");
  }

  return data.data;
};

export const fetchPostsByUserApi = async (userId: string) => {
  const response = await fetch(
    `${BASE_URL}/posts/user/${userId}`,
    {
      headers: getAuthHeaders()
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch user posts");
  }

  return data.data;
};

export const toggleLikeApi = async (postId: string) => {
  const response = await fetch(
    `${BASE_URL}/posts/${postId}/like`,
    {
      method: "POST",
      headers: getAuthHeaders()
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to toggle like");
  }

  return data.data;
};