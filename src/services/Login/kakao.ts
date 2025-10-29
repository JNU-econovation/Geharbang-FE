import { customAxios } from "../api/customAxios";

export const kakaoApi = {
  getKakaoLoginUrl: async (): Promise<string> => {
    const response = await customAxios.get<{ loginUrl: string }>(
      "/api/v1/oauth/kakao/login"
    );
    return response.data.loginUrl;
  },
};
