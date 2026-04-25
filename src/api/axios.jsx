import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Backend ka URL
  withCredentials: true, // Ye cookie set karne ke liye zaroori hai
});

export default api;
