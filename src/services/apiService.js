import { BASE_URL } from "../constants";

const fetchSinglePost = async (id, { signal } = {}) => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    signal, // Pass the signal to the fetch request
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};

const savePostById = async (id) => {
  const response = await fetch(`${BASE_URL}/user/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ postId: id }),
  });
  if (!response.ok) {
    throw new Error("Failed to save data");
  }
  return response.json();
};

const fetchAllChats = async () => {
  const response = await fetch(`${BASE_URL}/chats`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};

const sendMessage = async (id, message) => {
  const response = await fetch(`${BASE_URL}/messages/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ text: message }),
  });
  if (!response.ok) {
    throw new Error("Failed to send message");
  }
  const data = await response.json();
  return data;
};

const createChat = async (Id) => {
  const response = await fetch(`${BASE_URL}/chats`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ receiverId: Id }),
  });
  if (!response.ok) {
    throw new Error("Failed to create chat");
  }
  const data = await response.json();
  return data;
};

export {
  fetchSinglePost,
  savePostById,
  fetchAllChats,
  sendMessage,
  createChat,
};
