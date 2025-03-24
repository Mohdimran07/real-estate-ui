import { BASE_URL } from "../constants";

export const fetchAllChats = async () => {
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

export const sendMessage = async (id, message) => {
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

export const markChatAsRead = async (chatId) => {
  return fetch(`${BASE_URL}/chats/read/${chatId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
};

export const createChat = async (Id) => {
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

export const openChat = async (id) => {
  const response = await fetch(`${BASE_URL}/chats/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export const fetchProfileData = async () => {
  const [postsResponse, chatsResponse] = await Promise.all([
    fetch(`${BASE_URL}/user/profilePosts`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }),
    fetch(`${BASE_URL}/chats`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }),
  ]);

  if (!postsResponse.ok || !chatsResponse.ok) {
    throw new Error("Failed to fetch profile data");
  }

  const postsData = await postsResponse.json();
  const chatsData = await chatsResponse.json();

  return { postsData, chatsData };
};
