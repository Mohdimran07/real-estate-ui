import { BASE_URL } from "../constants";

export const singlePageLoader = async ({ request, params }) => {
  const res = await fetch(`${BASE_URL}/posts/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();
  console.log(data);
  return data;
};
