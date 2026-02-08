export const saveAuthData = (token, user) => {
  localStorage.setItem("authToken", token);
  localStorage.setItem("loggedInUser", JSON.stringify(user));
};

export const clearAuthData = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("loggedInUser");
};

export const getLoggedInUser = () => {
  const userData = localStorage.getItem("loggedInUser");
  return userData ? JSON.parse(userData) : null;
};

export const isUserLoggedIn = () => {
  return !!localStorage.getItem("authToken");
};
