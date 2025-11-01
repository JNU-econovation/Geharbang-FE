import { customAxios } from "../api/customAxios";

const getLoginUrl = async (provider: "kakao" | "google"): Promise<string> => {
  const response = await customAxios.get<{ loginUri: string }>(
    `/api/v1/oauth/${provider}/login`
  );

  return response.data.loginUri;
};

export const kakaoApi = {
  getLoginUrl: () => getLoginUrl("kakao"),
};

export const googleApi = {
  getLoginUrl: () => getLoginUrl("google"),
};
