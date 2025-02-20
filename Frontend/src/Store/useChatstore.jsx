import { create } from "zustand";
import AxiosInstance from "../lib/Axiosinstace";
import toast from "react-hot-toast";

const useChatstore = create((set) => ({
  messages: [],
  selecteduser: null,
  
  setSelectedUser: (user) => set({ selecteduser: user }),

  getuserSidebar: async () => {
    try {
      const res = await AxiosInstance.get("/message/user");
      return res.data.users; // Return the users array
    } catch {
      return null; // Return null silently on failure
    }
  },

  getMessages: async (receiverId) => {
    try {
      const res = await AxiosInstance.get(`/message/${receiverId}`);
      set({ messages: res.data.messages || [] });
      // console.log("get messages",res)
      return res.data.messages; // Return messages for immediate use
    } catch {
      set({ messages: [] }); // Just reset messages without logging or toasting errors
      return [];
    }
  },

  sendMessagetodb: async (text, receiverId, image = null) => {
    try {
      const payload = { text };
      if (image) payload.image = image;

      const res = await AxiosInstance.post(`/message/send/${receiverId}`, payload);
      toast.success("Message sent successfully");

      return res.data.data; // Return sent message data
    } catch {
      return null; // Silent failure, returning null
    }
  },
}));

export default useChatstore;
