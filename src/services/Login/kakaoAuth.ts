import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import { kakaoApi } from "@/src/services/Login/kakao";
import { KakaoLoginResponse } from "@/src/types/api/Login/kakaoLoginResponse";

WebBrowser.maybeCompleteAuthSession();

export const kakaoAuth = {
  async kakaoLogin(): Promise<KakaoLoginResponse> {
    const redirectUrl = AuthSession.makeRedirectUri({
      scheme: "geharbang",
      path: "auth/kakao/callback",
    });

    const kakaoLoginUrl = await kakaoApi.getKakaoLoginUrl();

    // 카카오 앱으로 열기
    const result = await WebBrowser.openAuthSessionAsync(
      kakaoLoginUrl,
      redirectUrl
    );

    // 코드 파싱
    if (result.type === "success") {
      const parsedUrl = new URL(result.url);
      const accessToken = parsedUrl.searchParams.get("accessToken");
      const userId = parsedUrl.searchParams.get("userId");

      if (!accessToken || !userId) {
        throw new Error("로그인 정보가 올바르지 않습니다.");
      }

      return {
        accessToken,
        user: { id: userId },
      };
    }

    if (result.type === "cancel") {
      throw new Error("로그인이 취소되었습니다.");
    }

    throw new Error("로그인에 실패했습니다.");
  },
};
