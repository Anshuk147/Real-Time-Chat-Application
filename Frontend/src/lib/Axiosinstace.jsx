import axios from "axios";

const AxiosInstance = axios.create({
  baseURL:import.meta.env.MODE ==="development" ? "http://localhost:3000/api":"/api",
  withCredentials: true,
});

export default AxiosInstance;
