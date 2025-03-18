import { create } from "zustand";
import { BASE_URL } from "../constants";

export const useNotificationStore = create((set) => ({
  notifications: 0,
  fetchNotifications: async () => {
    try {
      const res = await fetch(`${BASE_URL}/user/notifications`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      set({ notifications: data.data });
    } catch (error) {
      console.error(error);
    }
  },
  decreaseNotifications: () =>
    set((state) => ({ notifications: state.notifications - 1 })),
  resetNotifications: () => set({ notifications: 0 }),
}));
