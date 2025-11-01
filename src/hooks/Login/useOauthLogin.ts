import { useMutation } from "@tanstack/react-query";

import { oauthAuth } from "@/src/services/Login/oauthAuth";
import {
  loginResponse,
  OauthLoginType,
} from "@/src/types/api/Login/loginOauthType";
import { setAccessToken } from "@/src/utils/Login/secureStore";
import { Alert } from "react-native";

export const useOauthLogin = (provider: OauthLoginType) => {
  return useMutation<loginResponse>({
    mutationFn: () => oauthAuth.login(provider),

    onSuccess: async (data) => {
      await setAccessToken("access-token", data.accessToken);
    },
    onError: (error) => {
      Alert.alert("로그인 실패", error.message);
    },
  });
};
