import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

import { kakaoAuth } from "@/src/services/Login/kakaoAuth";
import { KakaoLoginResponse } from "@/src/types/api/Login/kakaoLoginResponse";

export const useKakaoLogin = () => {
  return useMutation<KakaoLoginResponse>({
    mutationFn: kakaoAuth.kakaoLogin,

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
