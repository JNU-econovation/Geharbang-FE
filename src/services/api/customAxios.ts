import axios from "axios";

export const customAxios = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
});

customAxios.interceptors.request.use((config) => {
  return config;
});
