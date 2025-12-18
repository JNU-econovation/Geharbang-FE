import { useAuthStore } from "@/src/stores/auth/useAuthStore";
import { router } from "expo-router";
import { Alert } from "react-native";

export const useRequireLogin = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);

  const requireLogin = (callback?: () => void) => {
    if (!isAuthReady) return;

    if (accessToken) {
      callback?.();
      return;
    }

    Alert.alert("로그인이 필요합니다", "로그인 후 이용할 수 있는 기능입니다.", [
      { text: "취소", style: "cancel" },
      {
        text: "로그인하기",
        onPress: () => {
          router.push("/login");
        },
      },
    ]);
  };

  return { requireLogin };
};
