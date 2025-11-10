import { TOKEN_KEYS } from "@/src/utils/constants/TokenKeys";
import { getAccessToken } from "@/src/utils/Login/secureStore";
import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_BASE_URL;

export const axiosPrivate = axios.create({
  baseURL: baseURL,
});

axiosPrivate.interceptors.request.use(async (config) => {
  const token = await getAccessToken(TOKEN_KEYS.ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const axiosPublic = axios.create({
  baseURL: baseURL,
});
