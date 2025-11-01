import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import { googleApi, kakaoApi } from "@/src/services/Login/loginUrlRequest";
import {
  loginResponse,
  OauthLoginType,
} from "@/src/types/api/Login/loginOauthType";

WebBrowser.maybeCompleteAuthSession();

const apiMap = {
  kakao: kakaoApi,
  google: googleApi,
};

// oauth 인증 플로우
export const oauthAuth = {
  async login(provider: OauthLoginType): Promise<loginResponse> {
    const redirectUrl = AuthSession.makeRedirectUri({
      scheme: "geharbang",
      path: `auth/${provider}/callback`,
    });

    const loginUrl = await apiMap[provider].getLoginUrl();

    // oauth 앱으로 열기
    const result = await WebBrowser.openAuthSessionAsync(loginUrl, redirectUrl);

    // 코드 파싱
    if (result.type === "success") {
      const parsedUrl = new URL(result.url);
      const accessToken = parsedUrl.searchParams.get("accessToken");
      const userId = parsedUrl.searchParams.get("userId");

      // accessToken, userId의 값에 null 포함될 수 있으므로
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
