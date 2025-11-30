import { axiosPublic } from "../api/customAxios";

const getLoginUrl = async (provider: "kakao" | "google"): Promise<string> => {
  const response = await axiosPublic.get<{ loginUri: string }>(
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
