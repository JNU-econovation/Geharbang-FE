import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";

import { oauthAuth } from "@/src/services/login/oauthAuth";
import { useAuthStore } from "@/src/stores/auth/useAuthStore";
import {
  loginResponse,
  OauthLoginType,
} from "@/src/types/api/Login/loginOauthType";
import { TOKEN_KEYS } from "@/src/utils/constants/TokenKeys";
import { setAccessToken } from "@/src/utils/login/secureStore";

export const useOauthLogin = (provider: OauthLoginType) => {
  const setAccessTokenStore = useAuthStore((state) => state.setAccessToken);

  return useMutation<loginResponse>({
    mutationFn: () => oauthAuth.login(provider),

    onSuccess: async (data) => {
      await setAccessToken(TOKEN_KEYS.ACCESS_TOKEN, data.accessToken);
      setAccessTokenStore(data.accessToken);
      
      router.replace("/(tabs)");
    },
    onError: (error) => {
      Alert.alert("로그인 실패", error.message);
    },
  });
};
