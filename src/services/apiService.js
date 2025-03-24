import { BASE_URL } from "../constants";

// Auth
const logoutHandler = async () => {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response.json();
};

const loginUser = async (userInfo) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userInfo),
  });
  return response.json();
};

const registerUser = async (userInfo) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userInfo),
  });
  return response.json();
};

export { logoutHandler, loginUser, registerUser };
