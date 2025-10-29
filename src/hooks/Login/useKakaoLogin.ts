import { useMutation } from "@tanstack/react-query";

import { kakaoAuth } from "@/src/services/Login/kakaoAuth";
import { KakaoLoginResponse } from "@/src/types/api/Login/kakaoLoginResponse";

export const useKakaoLogin = () => {
  return useMutation<KakaoLoginResponse>({
    mutationFn: kakaoAuth.kakaoLogin,
  });
};
