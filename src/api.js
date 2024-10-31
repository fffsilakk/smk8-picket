import axios from "axios";

const api = axios.create({
  baseURL: "https://picket.ocph23.tech/api/auth/login",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
