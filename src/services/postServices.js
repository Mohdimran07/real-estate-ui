import { BASE_URL } from "../constants";

export const getAllPosts = async (query) => {
  const response = await fetch(`${BASE_URL}/posts?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export const createPostProperty = async (postData, postDetail) => {
  console.log({ postData, postDetail });
  const res = await fetch(`${BASE_URL}/posts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ postData, postDetail }),
  });
  if (!res.ok) {
    throw new Error("Failed to create post");
  }
  const data = await res.json();
  return data;
};

export const updateUserProfile = async (userId, userInfo) => {
  const response = await fetch(`${BASE_URL}/user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userInfo),
  });
  return response.json();
};

export const fetchSinglePost = async (id, { signal } = {}) => {
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

export const savePostById = async (id) => {
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
