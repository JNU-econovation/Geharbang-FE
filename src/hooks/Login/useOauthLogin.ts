import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";

import { oauthAuth } from "@/src/services/Login/oauthAuth";
import {
  loginResponse,
  OauthLoginType,
} from "@/src/types/api/Login/loginOauthType";
import { setAccessToken } from "@/src/utils/Login/secureStore";

export const useOauthLogin = (provider: OauthLoginType) => {
  return useMutation<loginResponse>({
    mutationFn: () => oauthAuth.login(provider),

    onSuccess: async (data) => {
      await setAccessToken("access-token", data.accessToken);

      router.replace("/(tabs)");
    },
    onError: (error) => {
      Alert.alert("로그인 실패", error.message);
    },
  });
};
