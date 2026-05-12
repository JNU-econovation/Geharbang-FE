import { TOKEN_KEYS } from "@/src/utils/constants/TokenKeys";
import { getAccessToken } from "@/src/utils/login/secureStore";
import { API_BASE_URL } from "@/src/config/url";
import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const attachAccessToken = async (config: InternalAxiosRequestConfig) => {
  const token = await getAccessToken(TOKEN_KEYS.ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const axiosPrivate = axios.create({
  baseURL: API_BASE_URL,
});

axiosPrivate.interceptors.request.use(attachAccessToken);

export const axiosOptionalAuth = axios.create({
  baseURL: API_BASE_URL,
});

axiosOptionalAuth.interceptors.request.use(attachAccessToken);

export const axiosPublic = axios.create({
  baseURL: API_BASE_URL,
});
