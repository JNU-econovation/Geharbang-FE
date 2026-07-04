import { TOKEN_KEYS } from "@/src/utils/constants/TokenKeys";
import {
  getAccessToken,
  removeAccessToken,
} from "@/src/utils/login/secureStore";
import { API_BASE_URL } from "@/src/config/url";
import { useAuthStore } from "@/src/stores/auth/useAuthStore";
import axios, { AxiosError } from "axios";
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

axiosOptionalAuth.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ errorCode?: string }>) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retryWithoutAuth?: boolean })
      | undefined;
    const isInvalidToken =
      error.response?.status === 401 &&
      error.response.data?.errorCode === "INVALID_TOKEN";

    if (!isInvalidToken || !originalRequest || originalRequest._retryWithoutAuth) {
      return Promise.reject(error);
    }

    originalRequest._retryWithoutAuth = true;
    await Promise.allSettled([
      removeAccessToken(TOKEN_KEYS.ACCESS_TOKEN),
      removeAccessToken(TOKEN_KEYS.USER_ID),
    ]);
    useAuthStore.getState().setAccessToken(null);
    delete originalRequest.headers.Authorization;

    return axiosOptionalAuth(originalRequest);
  },
);

export const axiosPublic = axios.create({
  baseURL: API_BASE_URL,
});
