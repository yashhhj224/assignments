const BASE_URL = "http://localhost:5000/api";

const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

const sendRequest = async (endpoint, method, body = null) => {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Request failed");
  }

  return responseData;
};

export const registerUser = (data) => sendRequest("/register", "POST", data);
export const loginUser = (data) => sendRequest("/login", "POST", data);

export const fetchNotes = () => sendRequest("/notes", "GET");
export const createNote = (data) => sendRequest("/notes", "POST", data);
export const updateNote = (id, data) => sendRequest(`/notes/${id}`, "PUT", data);
export const deleteNote = (id) => sendRequest(`/notes/${id}`, "DELETE");
