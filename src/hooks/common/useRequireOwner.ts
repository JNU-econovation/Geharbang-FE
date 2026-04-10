import { router } from "expo-router";
import { Alert } from "react-native";

import { useAuthStore } from "@/src/stores/auth/useAuthStore";
import { useOwnerStatus } from "./useOwnerStatus";

export const useRequireOwner = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);
  const { data, isLoading } = useOwnerStatus();

  const requireOwner = (callback?: () => void) => {
    if (!isAuthReady || isLoading) return;

    if (!accessToken) {
      Alert.alert(
        "로그인이 필요합니다",
        "로그인 후 이용할 수 있는 기능입니다.",
        [
          { text: "취소", style: "cancel" },
          { text: "로그인하기", onPress: () => router.push("/login") },
        ]
      );
      return;
    }

    if (data?.inReview) {
      Alert.alert(
        "심사가 진행 중입니다",
        "운영진의 승인 완료 후 이용할 수 있습니다."
      );
      return;
    }

    if (!data?.isOwner && !data?.isAdmin) {
      Alert.alert(
        "사장님 인증이 필요합니다",
        "게스트하우스 등록 및 스텝 모집은 인증된 사장님만 이용할 수 있습니다.",
        [
          { text: "취소", style: "cancel" },
          {
            text: "인증하러 가기",
            onPress: () => router.push("/operator/verify"),
          },
        ]
      );
      return;
    }

    callback?.();
  };

  return { requireOwner };
};
