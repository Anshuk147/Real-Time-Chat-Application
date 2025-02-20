import { create } from "zustand";
import { io } from "socket.io-client";
import useAuthStore from "./useAuthstore";

const useSocketStore = create((set, get) => ({
  socket: null,
  socketMessages: {},
  onlineUsers: {}, // ✅   Store online users

  connect: () => {
    const userId = useAuthStore.getState().AuthUser?._id;
    if (!userId)
      // return console.log("❌ User not authenticated, cannot connect to socket");
    if (get().socket) return;

    const socket = io("http://localhost:3000", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("🟢 Connected to Socket.io:", socket.id);
      socket.emit("user_connected", { userId, socketId: socket.id });
    });

    socket.on("disconnect", () => {
      console.log("🔴 Disconnected from Socket.io");
    });

    // ✅ Listen for online users update
    socket.on("update_online_users", (users) => {
      // console.log("📡 Updated online users:", users);
      get().setOnlineUsers(users);
    });

    // ✅ Request the latest online users list on connect
    socket.emit("get_online_users");
    socket.on("online_users", (users) => {
      // console.log("🔄 Initial online users:", users);
      get().setOnlineUsers(users);
    });

    set({ socket });
  },

  // ✅ New method to update the online users list
  setOnlineUsers: (users) => {
    set({ onlineUsers: users });
  },
  addRealTimeMessage: (userId, message) =>
    set((state) => ({
      socketMessages: {
        ...state.socketMessages,
        [userId]: [
          ...(state.socketMessages[userId] || []),
          {
            ...message,
            text: message.message, // Rename 'message' to 'text' for consistency
          },
        ],
      },
    })),
  sendMessage: (receiverId, message) => {
    const userId = useAuthStore.getState().AuthUser?._id;
    const socket = get().socket;

    if (!userId || !socket)
      return console.log("❌ Cannot send message, user not connected");

    const newMessage = {
      senderId: userId,
      receiverId,
      message,
      timestamp: new Date(),
    };

    socket.emit("send_message", newMessage); // Send message to the server
    // console.log("📨 Message sent:", newMessage);
  },
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, onlineUsers: {} }); // ✅ Reset online users on disconnect
    }
  },
}));

export default useSocketStore;
