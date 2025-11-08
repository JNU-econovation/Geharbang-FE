import { getAccessToken } from "@/src/utils/Login/secureStore";
import axios from "axios";

export const axiosPrivate = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
});

axiosPrivate.interceptors.request.use(async (config) => {
  const token = await getAccessToken("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
