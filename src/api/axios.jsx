import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Backend ka URL
  withCredentials: true, // Ye cookie set karne ke liye zaroori hai
});

export default api;
