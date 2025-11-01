import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

import { oauthAuth } from "@/src/services/Login/oauthAuth";
import {
  loginResponse,
  OauthLoginType,
} from "@/src/types/api/Login/loginOauthType";

export const useOauthLogin = (provider: OauthLoginType) => {
  return useMutation<loginResponse>({
    mutationFn: () => oauthAuth.login(provider),

    onSuccess: async (data) => {
      console.log("로그인 성공:", data);
      Alert.alert("로그인 성공", String(data));
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
      Alert.alert("로그인 실패", error.message);
    },
  });
};
