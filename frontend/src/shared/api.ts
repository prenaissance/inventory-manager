import axios from "axios";
import { useAuth } from "./stores/auth-store";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5173/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const authState = useAuth.getState();
  if (authState.isAuthenticated) {
    config.headers.Authorization = `Bearer ${authState.token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      useAuth.getState().logout();
    }
    return Promise.reject(error);
  },
);
