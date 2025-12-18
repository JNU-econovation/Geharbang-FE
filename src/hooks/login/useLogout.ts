import { useAuthStore } from "@/src/stores/auth/useAuthStore";
import { TOKEN_KEYS } from "@/src/utils/constants/TokenKeys";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export const useLogout = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const queryClient = useQueryClient();

  const performLogout = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEYS.ACCESS_TOKEN);
      setAccessToken(null);
      queryClient.clear();

      Alert.alert("로그아웃 되었습니다", "", [
        { text: "확인", onPress: () => router.replace("/(tabs)") },
      ]);
    } catch (e) {
      Alert.alert("오류", "로그아웃 중 문제가 발생했습니다.");
    }
  };

  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "로그아웃",
        style: "destructive",
        onPress: performLogout,
      },
    ]);
  };

  return handleLogout;
};
