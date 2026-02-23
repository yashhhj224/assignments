
const BASE_URL = "http://localhost:5000/api";

export const loginApi = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data.data;
};

export const registerApi = async (payload: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data.data;
};

export const updateProfileApi = async (
  formData: FormData
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${BASE_URL}/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Profile update failed");
  }

  return data; 
};
