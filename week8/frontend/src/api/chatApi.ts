
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
  content: string
) => {
  const res = await fetch(`${API_BASE}/chat/messages`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ conversationId, content }),
  });
  return res.json();
};
