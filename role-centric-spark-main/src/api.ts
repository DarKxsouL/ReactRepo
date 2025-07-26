// src/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // or your deployed server URL
  withCredentials: true, // optional: only if you use cookies
});

export default api;
