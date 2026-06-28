const BASE_URL = "http://localhost:3000";

// Register a new admin account
export const registerUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

// Login to an existing admin account
export const login = async (credentials) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

// Store token in localStorage after login
export const saveToken = (token) => {
  localStorage.setItem("mu_token", token);
};

// Retrieve token from localStorage
export const getToken = () => {
  return localStorage.getItem("mu_token");
};

// Remove token (logout)
export const logout = () => {
  localStorage.removeItem("mu_token");
};

// Check if user is logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem("mu_token");
};
