import { TOKEN_KEYS } from "@/src/utils/constants/TokenKeys";
import { getAccessToken } from "@/src/utils/login/secureStore";
import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const DEFAULT_BASE_URL = "https://geharbang.org";
const baseURL =
  process.env.EXPO_PUBLIC_BASE_URL ||
  process.env.EXPO_PUBLIC_API_URL ||
  DEFAULT_BASE_URL;

const attachAccessToken = async (config: InternalAxiosRequestConfig) => {
  const token = await getAccessToken(TOKEN_KEYS.ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const axiosPrivate = axios.create({
  baseURL,
});

axiosPrivate.interceptors.request.use(attachAccessToken);

export const axiosOptionalAuth = axios.create({
  baseURL,
});

axiosOptionalAuth.interceptors.request.use(attachAccessToken);

export const axiosPublic = axios.create({
  baseURL,
});
