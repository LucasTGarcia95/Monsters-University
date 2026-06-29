const BASE_URL = "http://localhost:3000";

export const registerUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.text();
};

export const login = async (credentials) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.text();
};

export const saveToken = (token) => {
  localStorage.setItem("mu_token", token);
};

export const getToken = () => {
  return localStorage.getItem("mu_token");
};

export const logout = () => {
  localStorage.removeItem("mu_token");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("mu_token");
};
