
const API_BASE = "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found in localStorage");
  }

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const fetchConversationsApi = async () => {
  const res = await fetch(`${API_BASE}/chat/conversations`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const createOrGetConversationApi = async (
  userId: string
) => {
  const res = await fetch(
    `${API_BASE}/chat/conversations`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ targetUserId: userId }),
    }
  );

  return res.json();
};

export const fetchMessagesApi = async (conversationId: string) => {
  const res = await fetch(
    `${API_BASE}/chat/conversations/${conversationId}/messages`,
    { headers: getAuthHeaders() }
  );
  return res.json();
};

export const sendMessageApi = async (
  conversationId: string,
  content?: string,
  files?: File[]
) => {
  const formData = new FormData();

  formData.append("conversationId", conversationId);

  if (content) {
    formData.append("content", content);
  }

  if (files && files.length > 0) {
    files.forEach((file) => {
      formData.append("media", file);
    });
  }

  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/chat/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
};

export const createGroupApi = async (
  name: string,
  memberIds: string[],
  avatar?: File | null
) => {
  const formData = new FormData();

  formData.append("name", name);
  memberIds.forEach(id => formData.append("members", id));

  if (avatar) {
    formData.append("avatar", avatar);
  }

  const res = await fetch(`${API_BASE}/chat/groups`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }, 
    body: formData,
  });

  return res.json();
};
