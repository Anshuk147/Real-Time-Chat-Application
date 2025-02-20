import { create } from "zustand";
import AxiosInstance from "../lib/Axiosinstace";
import toast from "react-hot-toast";
import handleError from "../lib/handleError";
import useSocketstore from "./useSocketstore";
const useAuthStore = create((set, get) => ({
  AuthUser: null,

  updateselecteduser: (user) => {
    set((state) => ({ selecteduser: user }));
  },

  login: async (formData) => {
    try {
      const { data } = await AxiosInstance.post("/auth/login", formData);
      // console.log("the data from login", data);
      toast.success("Logged in successfully!");
      setTimeout(() => {
        set((state) => ({
          AuthUser: { ...data }, // Ensure it's a new object
        }));
      }, 1000);

    } catch (error) {
      handleError(error);
    }
  },

  signup: async (formData) => {
    try {
      const { data } = await AxiosInstance.post("/auth/signup", formData);
      toast.success("Account created successfully!");

      // setTimeout(() => {
      //   set({ AuthUser: data.user });
  
      // }, 1000);
    } catch (error) {
      handleError(error);
    }
  },

  checkAuth: async () => {
    try {
      const { data } = await AxiosInstance.get("/auth/check");

      set({ AuthUser: data });
    } catch (error) {
      handleError(error);
    }
  },

  logout: async () => {
    try {
      await AxiosInstance.get("/auth/logout");
      toast.success("Logged Out Successfully");
      // ✅ Correct way to call disconnect function
      const { disconnect } = useSocketstore.getState();
      disconnect(); // Disconnect the socket
      setTimeout(() => {
        set({ AuthUser: null });
      }, 1000); // Delays state update by 1 second
    } catch (error) {
      handleError(error);
    }
  },
  updateProfilePic: async (file) => {
    try {
      // Convert file to Base64
      const base64Image = await convertFileToBase64(file);

      // Send the Base64 image in the request body
      const res = await AxiosInstance.put(
        "/auth/update-profilePic",
        { profilePic: base64Image },
        { withCredentials: true }
      );

      // Ensure the response contains user data
      if (res.data) {
        set({ AuthUser: res.data }); // Update user profile in store
        toast.success("Profile picture updated successfully!");
      } else {
        toast.error("Failed to update profile picture.");
      }
    } catch (error) {
      toast.error("Failed to upload profile picture.");
      console.error("Error uploading profile picture:", error);
    }
  },
}));

const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
export default useAuthStore;
